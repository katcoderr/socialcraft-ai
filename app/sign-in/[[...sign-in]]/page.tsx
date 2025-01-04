import {SignIn} from '@clerk/nextjs'

export default function SignInPage(){
    return (
        <div className='flex justify-center items-center min-h-screen '>
            <SignIn 
                appearance={{
                    elements : {
                        formButtonPrimary : 'bg-gray-500 hover:bg-gray-600 text-sm normal-case'
                    }
                }}/>

        </div>
    )
}