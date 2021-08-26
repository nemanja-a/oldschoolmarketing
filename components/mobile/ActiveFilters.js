import VisuallyHidden from "@reach/visually-hidden"
import style from "../../styles/activefilters.module.css"
import utilStyles from "../../styles/utils.module.css"

export default function ActiveFilters({selectedCategory, selectedCountry, clearFilters}) { 
    const clearFilter = (type) => { clearFilters({[type]: ''}) }

    return (
        <div className={style.container}>
            <div className={style.wrapper}>                
                <div className={style.filterLabel}> 
                    Category: {selectedCategory && selectedCategory.displayValue || 'All'}
                    {selectedCategory && selectedCategory.displayValue && <button className={utilStyles.closeButton} onClick={() => clearFilter('category')}>
                        <VisuallyHidden>Clear</VisuallyHidden>
                        <span aria-hidden>×</span>
                    </button>}
                </div>                
            </div>
            <div className={style.wrapper}>                
                <div className={style.filterLabel}> 
                    Country: {selectedCountry && selectedCountry.displayValue || 'All'}
                    {selectedCountry && selectedCountry.displayValue && <button className={utilStyles.closeButton} onClick={() => clearFilter('country')}>
                        <VisuallyHidden>Clear</VisuallyHidden>
                        <span aria-hidden>×</span>
                    </button>}
                </div>                
            </div>
        </div>
    )
}