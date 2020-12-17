import  { useEffect, useState, FC } from 'react'; 
import { Upload, Button, Layout, Menu, Radio, Transfer, Input, Form } from 'antd';
import s from './index.css';
import * as React from 'react';
import { runInAction } from 'mobx'
import { ApiPromise, WsProvider } from '@polkadot/api'
import keyring from '@polkadot/ui-keyring';
import { KeypairType } from '@polkadot/util-crypto/types';
import { KeyringPair$Json } from '@polkadot/keyring/types';
import { Spin } from 'antd';
import { observer } from 'mobx-react';
import AppStore from '../../store';
import { useStores } from '@utils/hooks/useStores';
// import Api from '@polkadot/api/promise';
import cx from 'classnames';

const SHOW_TYPE = {
    UNIFIED: 0,
    SPLITED: 1
}

const FormItem = Form.Item;

const BLOCK_LENGTH = 5;

const ACCOUNT_JSON = {"address":"12HR77csAyeej9PrGNu7mykNfaiShU5PLvJdGNzZWG7dEN1Z","encoded":"UgbG4dup0sgb7K7rMMnajy0UAsR6Jm6Z9AB8ECEyM1AAgAAAAQAAAAgAAABFPx2JAeE6M1efsHbQfqkwWZLqxr2NeoBMsDCr4BKT/KQZmVCZjNd8Uo//xtYTpidx3hniZvhJ3tgnHEIO+9c2tQyIwpUA/SvxeSpGIYPBSwKPVHcYWvFdroH+LVykXejfKL/TBfQgMyZP3xvO5MdYnylrdan8mNWZL4ptorr4ynx8fy2PSJxyPx6k8dfioymDj6j2rTyMNxzL+9w4","encoding":{"content":['pkcs8', 'sr25519' as KeypairType],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{"genesisHash":"0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3","name":"xiao","tags":[],"whenCreated":1607046145213}};

const OFFICAL_END_POINT = 'wss://rpc.polkadot.io';

const senderAddress = '12HR77csAyeej9PrGNu7mykNfaiShU5PLvJdGNzZWG7dEN1Z';
const receiverAdd = '13DrGJTWv6wwJe9z9FHtoPRTYxYWyWepfVBDuPY4RDmANj9R';

const ContentDiff: FC = function() {

    //let xxx;
    const [passWord, setPass] = useState('');
    //const globalStore = useStores();
    //const appStore = useAppStore();
    const { api, hasInit } = useStores();
    //console.log(globalStore, 'vdfewf');
    //const { api, hasInit } = globalStore.appStore; //appStore;
    //const provider = new WsProvider(OFFICAL_END_POINT);
    //let api = new ApiPromise({ provider });
    //const stakingOverview = useCall(api.derive.staking.overview);

    // useEffect(() => {
    //     console.log('begin');
    //     async function initApi() {
    //         const provider = new WsProvider(OFFICAL_END_POINT);
    //         api = await ApiPromise.create({
    //             provider
    //         });
    //         //  keyring初始化
    //         keyring.loadAll({ 
    //             genesisHash: api.genesisHash,
    //             ss58Format: 0,
    //             store: undefined,
    //             type: 'ed25519'
    //         }, [])
    //         setInitSta(true);
    //         console.log(api, 'init complete!');
    //     }
    //     initApi();
    // }, []);

    const [blockNum, setBNum] = useState(0);

    function unLockAccount() {
        try {
            const publicKey = keyring.decodeAddress(senderAddress);
            const pair = keyring.getPair(publicKey);
            pair.decodePkcs8(passWord);
        } catch(e) {
            console.log(e);
        }
    }

    async function testApi() {
        const [chain, nodeName, nodeVersion] = await Promise.all([
            api.rpc.system.chain(),
            api.rpc.system.name(),
            api.rpc.system.version()
        ]);
        console.log(chain, nodeName, nodeVersion);
        // api.rpc.chain.subscribeNewHeads((header) => {
        //     //  setBNum(header.number);
        //     console.log(header, 'header');
        //     console.log(`Chain is at #${header.number}`);
        // });
    };

    const changeSec = function(event: React.ChangeEvent<HTMLInputElement>) {
        setPass(event.target.value);
    }

    async function transferTo() {
        const sendPair = keyring.createFromJson(ACCOUNT_JSON as unknown as KeyringPair$Json);
        keyring.saveAccount(sendPair, passWord);
        const keypair = keyring.getAddress(senderAddress);
        const a = keyring.isAvailable(receiverAdd);
        const tx = api.tx.balances.transfer(receiverAdd,0.03);
        unLockAccount();
        const publicKey = keyring.decodeAddress(senderAddress);
        const pair = keyring.getPair(publicKey);
        const hash = await tx.signAndSend(pair);
        console.log(hash);
    }

    function forDetail() {
    }
    console.log('render');
    return (
        <>
            {!hasInit && <Spin />}
            <div className={s.wrapper}>
                <div onClick={testApi}>当前区块{}</div>
                <div onClick={forDetail}>啦啦啦</div>
                <div onClick={transferTo}>点我转账</div>
                <FormItem className={s.input}>
                    <Input onChange={changeSec}/>
                </FormItem>
            </div>
        </>
    )
}

export default observer(ContentDiff);