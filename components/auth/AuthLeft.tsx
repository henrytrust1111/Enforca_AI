"use client"

import Image from "next/image";

const AuthLeft = () => {

    return (
        <div className="hidden lg:flex">
            <Image src="/images/auth-image.png" alt="CV Review" layout="responsive" width={100} height={100} />
        </div>
    )
}

export default AuthLeft
