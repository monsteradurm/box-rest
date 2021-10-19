/* eslint-disable */
import {environment} from './environment';
import * as _ from 'underscore';

const BoxSDK = require('box-node-sdk');

export class BoxHelper {

    public static SDK = BoxSDK.getPreconfiguredInstance(environment);
    public Client;

    public GetClient() {
        // return BoxHelper.SDK.getAppAuthClient('user', environment.box.user);
        return BoxHelper.SDK.getAppAuthClient('enterprise', environment.enterpriseID);
    }

    public async GetShareFolder(root: string, folder: string) {
        const entry = await this.get_subfolder(root, folder);
        if (!entry) { return null; }

        return entry.shared_link;

    }

    public async GetThumbnail(id: string) {
        return await this.Client.files.getThumbnail(id);
    }

    public async GetThumbnails(ids: string[]) {
        const result = {};
        for (const id of ids) {
            result[id] = await this.Client.files.getThumbnail(id);
        }

        return result;
    }

    public async GetSubFolderItems(root: string, folder: string) {
        const entry = await this.get_subfolder(root, folder);
        if (!entry) { return null; }

        return await this.GetFolderItems(entry.id);
    }

    public async GetSubFolder(root: string, folder: string) {
        const folders = await this.GetFolderItems(root);

        if (!folders || !folders.entries) {
            return null;
        }

        const subfolder =  _.find(folders.entries, f => f.type == 'folder' && f.name.toLowerCase() == folder.toLowerCase());

        return subfolder ? subfolder : null;
    }

    public async get_subfolder(root: string, folder: string) {
        const folders = await this.GetFolderItems(root);

        if (!folders || !folders.entries) {
            return null;
        }

        const result =  _.find(folders.entries, f => f.type == 'folder' && f.name.toLowerCase() == folder.toLowerCase());

        if (result.shared_link != null) {
            return result;
        }

        const shared = await this.Client.folders.update(result.id, {
            shared_link: {
                access: 'open',
                permissions: {
                can_download: true
                }
            }
        });

        return shared;
    }

    public async GetFolderItems(parent) {
        return await this.Client.folders.getItems(parent, { fields: 'name,shared_link,type, path_collection', offset: 0, limit: 1000});
    }

    public async get_webhook(id) {
        return await this.Client.webhooks.get(id);
    }

    constructor() {
        this.Client = this.GetClient();
    }
}
