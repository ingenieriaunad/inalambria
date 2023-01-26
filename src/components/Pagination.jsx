import React, { useEffect, useState } from 'react'

const Pagination = (props) => {
    const [links, setLinks] = useState([]);
    useEffect(() => {
        const previousPageEnabled=props.currentPage!==1;
        const previousPage=previousPageEnabled?props.currentPage-1:1;
        const links=[];
        links.push({
            text: 'Anterior', 
            enabled: previousPageEnabled, 
            page: previousPage,
            active: false
        });
        for(let i=1; i<=props.totalPages; i++){
            if(i>=props.currentPage-props.radio && i<=props.currentPage+props.radio){
                links.push({
                    text: `${i}`, 
                    enabled: true, 
                    page: i,
                    active:  props.currentPage===i,
                });
            }
        }
        const nextPageEnabled=props.currentPage!==props.totalPages && props.totalPages>1;
        const nextPage=props.currentPage+1;
        links.push({
            text: 'Siguiente',
            enabled: nextPageEnabled,
            page: nextPage,
            active: false
        });
        setLinks(links);
    }, [props.currentPage, props.radio, props.totalPages])
    function getClassLinks(link){
        if(link.active){
            return 'active pointer';
        }
        if(!link.enabled){
            return 'disabled';
        }
        return 'pointer';
    }
    function setPage(link){
        if(link.page===props.currentPage){
            return;
        }
        if(!link.enabled){
            return;
        }
        props.onChangePage(link.page);
    }
  return (
    <nav>
        <ul className={`pagination ${props.className}`}>
            {
                links.map((link) => (
                    <li key={link.text} 
                        className={`page-item cursor ${getClassLinks(link)}`}
                    >
                        <button 
                            className="page-link" 
                            onClick={() => setPage(link)}
                        >
                            {link.text}
                        </button>
                    </li>
                ))
            }
        </ul>

    </nav>
  )
}

export default Pagination