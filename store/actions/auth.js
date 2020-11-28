import api from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const signup = async (name, email, password, passwordConfirm) => {
    let response = await api.post('auth/signup', JSON.stringify({
        name:name, email:email, password:password, passwordConfirm:passwordConfirm
    }))
    .catch(err=>console.log(err))
    console.log(response.data)
}


export const login = async (email, password, {navigation}) => {
    api.post('auth/login', JSON.stringify({
        email:email, password:password
    })).then(response=>{
        AsyncStorage.multiSet([['token', response.data.token],
                                ['username', response.data.username],
                                ['id', response.data._id]]).then(()=>{
                                    console.log("Teste")
                                    navigation.navigate('Main');
                                })
    })
    .catch(err=>{
        if(err.response.status === 401){
            alert("Usuario ou senha incorretos")
        }
    })
}


export const logout = (navigation) => {
    AsyncStorage.clear().then(()=>{
        navigation.navigate('Login');
    }).catch(err=> alert(err))
}