import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-2 text-black">
            <h1 className="text-5xl font-bold mb-20">StrayaGPT</h1>
            <div className='flex space-x-2 text-center'>
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        <SunIcon className="h-8 w-8" />
                        <h2>Examples</h2>
                    </div>

                    <div className="space-y-2">
                        <p className="infoText">&quot;G&apos;day mate, what&apos;s on for the barbie this weekend?&quot;</p>
                        <p className="infoText">&quot;What&apos;s your favourite footy team in NSW?&quot;</p>
                        <p className="infoText">&quot;Fancy a cold one at the pub?&quot;</p>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        <BoltIcon className="h-8 w-8" />
                        <h2>Capabilities</h2>
                    </div>

                    <div className="space-y-2">
                        <p className="infoText">&quot;Respond like an daily Aussie bloke&quot;</p>
                        <p className="infoText">&quot;Tell you some local hidden gems for tourists&quot;</p>
                        <p className="infoText">&quot;Make you laugh!&quot;</p>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        <ExclamationTriangleIcon className="h-8 w-8" />
                        <h2>Limitations</h2>
                    </div>

                    <div className="space-y-2">
                        <p className="infoText">&quot;Not all information are strictly validated&quot;</p>
                        <p className="infoText">&quot;It may still misinterpret your questions&quot;</p>
                        <p className="infoText">&quot;Sometimes it loses the contextual links&quot;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage