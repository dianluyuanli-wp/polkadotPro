import { observable, runInAction, action, makeAutoObservable } from 'mobx';
import { ApiPromise, WsProvider } from '@polkadot/api'
import keyring from '@polkadot/ui-keyring';
import { OFFICAL_END_POINT } from '@constants/url';

class AppStore {
    @observable hasInit: boolean = false;
    @observable api: ApiPromise;

    constructor() {
        makeAutoObservable(this)
    }

    @action.bound
    async init(): Promise<void> {
        const provider = new WsProvider(OFFICAL_END_POINT);
        this.api = await ApiPromise.create({
            provider
        });
        //  keyring初始化
        keyring.loadAll({
            genesisHash: this.api.genesisHash as any,
            ss58Format: 0,
            store: undefined,
            type: 'ed25519'
        }, [])
        console.log('api init');
        runInAction(() => {
            this.hasInit = true;
        })
    }
}

export default new AppStore();
