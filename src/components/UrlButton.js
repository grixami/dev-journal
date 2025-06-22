


export default function UrlButton({ buttonText, link }) {

    return(
        <a href={link} className="border-2 border-[#f0f6fc] px-2 py-2 rounded-lg hover:bg-[#35383d] text-[#f0f6fc]">{buttonText}</a>
    )
}