import yayJpg from '../assets/yay.jpg';
import {useEffect} from "react";
// import onCheckUpdate from "umi-plugin-update-notification/src/tpl";

export default function HomePage() {
    useEffect(() => {
        // onCheckUpdate()
    }, []);
    return (
        <div>
            <h2>Yay! Welcome to umi!</h2>
            <p>
                <img src={yayJpg} width="388"/>
            </p>
            <p>
                To get started, edit <code>pages/index.tsx</code> and save to reload.
            </p>
        </div>
    );
}
