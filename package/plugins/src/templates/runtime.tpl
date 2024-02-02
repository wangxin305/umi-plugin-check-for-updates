import dayjs from '{{{dayjsPath}}}';
import {Modal, Typography} from '{{{antdPath}}}';

const poll: number = {{poll}}
const force: boolean = {{force}}
const sys_version:number = {{version}}
let intervalTimer: NodeJS.Timer;
console.log(`version：%c${sys_version}`, 'color:#1677ff');
console.log(`发布时间：%c${new Date(sys_version)}`, 'color:#1677ff');

export async function checkUpdate() {
    await window
        .fetch(`/version/version.json?t=${Date.now()}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch version.json`);
            }
            return response.json();
        })
        .then((data) => {
            const {version, content,image} = data;
            if (!!poll) {
                if (sys_version !== version && force) {
                    Modal.destroyAll();
                    Modal.confirm({
                        title: '版本更新提示',
                        content: (
                            <div className={'version'}>
                                {image && <img  src={image} width='100%'/>}
                                <ol>
                                    {content.map((c: string, i: number) => {
                                        return <li key={i}>{c}</li>;
                                    })}
                                </ol>
                                <p>
                                    <Typography.Text type={'secondary'}>
                                        更新时间：{dayjs(version).format('YYYY年MM月DD日 HH:mm:ss')}
                                    </Typography.Text>
                                </p>
                            </div>
                        ),
                        okText: '立即刷新',
                        onOk: () => {
                            window.location.reload();
                        },
                    });
                }
            }else{
                return data
            }

        });
};
if (!!poll) {
    intervalTimer = setInterval(checkUpdate, poll);
    window.addEventListener('visibilitychange', async () => {
        if (document.visibilityState === 'visible') {
            await checkUpdate();
            intervalTimer = setInterval(checkUpdate, poll);
        }
        if (document.visibilityState === 'hidden') {
            intervalTimer && clearInterval(intervalTimer);
        }
    });
}



