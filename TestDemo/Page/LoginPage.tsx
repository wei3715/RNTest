import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ConfirmButton, Tips, NavBar,Input } from "../Common/LoginComponent";
import LoginDao from "../Common/LoginDao";
export default (props: any) => { 
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('ddd');
    const [helpeUrl, setHelpUrl] = useState('https://baidu.com');
    const onLogin = () => { 
        if (userName === ''|| password === '') { 
            setMsg('用户名或密码不能为空');
            return;
        }
        setHelpUrl('');
        setMsg('');
        LoginDao.getInstance()
            .login(userName, password)
            .then((res) => {
                setMsg('登录成功');
            }).catch((e) => {
                const { code, data: { helpUrl = '' } = {}, msg } = e;
                setMsg(msg);
                setHelpUrl(helpUrl);
            });
    };
    return (
        <SafeAreaView style={styles.root}>
            <NavBar title="登录" rightTitle="注册" />
            <View style={styles.line}/>
            <View style={styles.content}>
                <Input
                    label="用户名"
                    placeholder="请输入用户名"
                    shortline={true}
                    onChangeText={(text:string) => { setUserName(text)}}
                />
                <Input
                    label="密码"
                    placeholder="请输入密码"
                    secure={true}
                    onChangeText={(text:string) => { setPassword(text)}}
                />
                <ConfirmButton title='登录' onclick={onLogin} />
                <Tips msg={msg} helpUrl={helpeUrl} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    root: {
        flex: 1,
        
    },
    content: {
        paddingTop: 20,
        backgroundColor:'#F1F5F6',
        flexGrow:1
    },
    line: {
        height: 0.5,
        backgroundColor:'#D0D4D5'
    }
}); 