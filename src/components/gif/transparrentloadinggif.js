import Image from "next/image"

export default function TransparrentLoadingGif(props) {
    return(
        <Image
            src="/assets/img/transparrentloading.gif"
            alt="loading gif"
            width={30}
            height={30}
            {...props}
        />
    )
}