import React, { Component } from "react";
import FlashMessage, {showMessage, hideMessage} from 'react-native-flash-message'

export const Aviso = (title = '', message) => {
    showMessage({
        message:title,
        description:message,
        type:'warning',
        icon:'warning',
        style:{backgroundColor:'orange'},
    })
}

export const Sucesso = (title = '', message) => {
    showMessage({
        message:title,
        description:message,
        type:'success',
        icon:'success',
        style:{backgroundColor:'green'},
    })
}

export const Erro = (title = '', message) => {
    showMessage({
        message:title,
        description:message,
        type:'danger',
        icon:'danger',
        style:{backgroundColor:'red'},
    })
}