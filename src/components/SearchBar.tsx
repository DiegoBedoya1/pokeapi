interface SearchBarProps{
    text:string;
    onSearch: (text:string) => void;
}

export default function SearchProps({text,onSearch}:SearchBarProps){
    return(
        <div>
            <input
            placeholder = "buscar pokemon"
            type = "text"
            value = {text}
            onChange = {(e) => onSearch(e.target.value)}/>
        </div>
    )
}