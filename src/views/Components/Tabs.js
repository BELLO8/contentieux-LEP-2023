
export const Tabs = ({ tabsData, active, setActive }) => {
    return (
        <>
            <div className="bg-white py-[3px] px-[4px] mt-2 w-fit shadow-sm rounded-lg">
                {
                    tabsData.map((item) => (
                        <button onClick={() => {
                            setActive(item)
                        }} className={`text-xs text-black font-medium px-1 rounded-lg py-[8px]  ${active?.id === item.id ? 'bg-orange-400 text-white' : ''}`}>{item.libelle}</button>
                    )).sort(function (a, b) { return a?.id - b?.id })
                }
            </div>
        </>
    )
}
