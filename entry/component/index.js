import React from 'react';
import s from './color.css';
import cx from 'classnames';
import { Upload, Button, Layout, Menu, Radio } from 'antd';
import ContentDiff from '../contentDiff';
import DiffPanel from '../diffPanel';
import Stake from './page/stake';
var jsDiff = require('diff');

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
        currentTab: TAB.CONTENT
    }

    getContent = () => {
        const contentMap = {
            [TAB.CONTENT]: () => {
                return <Stake />
            },
            [TAB.WORD]: () => <DiffPanel type='words'/>,
            [TAB.LINES]: () => <div><DiffPanel type='lines'/></div>,
        };
        return contentMap[this.state.currentTab]();
    }

    navChange = (e) => {
        this.setState({
            currentTab: e.key
        })
    }

    render() {
        return <Layout>
            <Menu onClick={this.navChange} mode='horizontal' defaultSelectedKeys={[this.state.currentTab]}>
                <Menu.Item key={TAB.CONTENT}>质押</Menu.Item>
                <Menu.Item key={TAB.WORD}>单词diff</Menu.Item>
                <Menu.Item key={TAB.LINES}>行内容diff</Menu.Item>
            </Menu>
            {this.getContent()}
            <Footer style={{ textAlign: 'center' }}>Produced by 广兰路地铁</Footer>
        </Layout>
    }
}

export default ShowComponent;