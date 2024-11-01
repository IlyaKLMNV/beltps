import {FC, useContext, useState, useCallback} from 'react';
import {Context} from "../main";
import {observer} from "mobx-react-lite";
import logo from '../img/beltrubprovodstroy.png';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    const onSubmitForm = (event: any) => {
        event.preventDefault();
    }

    // console.log('LoginForm');
    

    const onChangeEmail = (e: any) => {
        setEmail(e.target.value)
    }
    

    // effector
    // TODO: routing разделить на isAuth и isAnonymous
    // react-router-dom


    return (
        <div>
            {/* <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <button onClick={() => store.login(email, password)}>
                Логин
            </button>
            <button onClick={() => store.registration(email, password)}>
                Регистрация
            </button> */}



            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-32 w-auto"
                        src={logo}
                        alt="beltps"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Войдите в ваш аккаунт
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={onSubmitForm}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Ваша почта
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={onChangeEmail}
                                    value={email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Пароль
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Забыли пароль?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                // onClick={() => store.login(email, password)}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Вход
                            </button>
                            {/* <button
                                onClick={() => store.registration(email, password)}
                                // type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                                >
                                Регистрация
                            </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const LoginInput = () => {

}

export default observer(LoginForm);