import React from "react";
import { connect } from "react-redux";

import AutocompleteInput from "./components/auto_complete_input";
import { Layout } from 'antd';
import "../style.css"

const { Header, Content, Footer } = Layout;

const HomePage = () => {

    return (
        <div className="App" style={{ height: "100vh", width: "100vw" }}>
            <Layout>
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                </Header>
                <Content
                    className="site-layout"
                    style={{
                        padding: '0 50px',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 580,
                            background: "#fff",
                        }}
                    >
                        <AutocompleteInput />
                    </div>
                </Content>
                <Footer></Footer>
            </Layout>
        </div>
    )
}

export default connect(null,{})(HomePage);
