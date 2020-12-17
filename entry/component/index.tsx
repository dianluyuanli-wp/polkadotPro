import React from 'react';
import { Upload, Button, Layout, Menu, Radio } from 'antd';
import Stake from './page/stake';
import AppStore from './store';
import { observable } from 'mobx';
import { MobXProviderContext  } from 'mobx-react';
import { MenuInfo } from 'rc-menu/es/interface';
const { Header, Content, Footer } = Layout;

const TAB = {
    CONTENT: '0',
    WORD: '1',
    LINES: '2',
    FILE: '3'
}

//  传统写法
class ShowComponent extends React.Component {
    state = {
        currentTab: TAB.CONTENT,
    }

    // inject store
    AppWrapper = () => {
        AppStore.init();
        return <MobXProviderContext.Provider value={AppStore}>
            {this.getContent()}
        </MobXProviderContext.Provider>
    }

    getContent = () => {
        const contentMap = {
            [TAB.CONTENT]: () => {
                return <Stake />
            },
        };
        return contentMap[this.state.currentTab]();
    }

    navChange = (e: MenuInfo) => {
        this.setState({
            currentTab: e.key
        })
    }

    render() {
        return <Layout>
            <Menu onClick={this.navChange} mode='horizontal' defaultSelectedKeys={[this.state.currentTab]}>
                <Menu.Item key={TAB.CONTENT}>质押</Menu.Item>
            </Menu>
            {this.AppWrapper()}
            <Footer style={{ textAlign: 'center' }}>Produced by 广兰路地铁</Footer>
        </Layout>
    }
}

export default ShowComponent;