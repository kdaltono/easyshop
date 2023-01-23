import React, { useEffect, useState } from 'react';
import { getRestMessage } from '../../http/rest_api';
import { useSelector } from 'react-redux';

export function Home(props) {
    const [restMsg, setRestMsg] = useState(0)
    const first_name = useSelector((state) => state.user.first_name)

    useEffect(() => {
        getRestMessage().then((res) => {
            setRestMsg(res.data)
        })
    }, [])

    return (
        <div>
            <p>Rest API Message: {restMsg}</p>
            <p>Welcome {first_name}!</p>
        </div>
    )
}