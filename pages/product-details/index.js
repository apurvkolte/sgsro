import React, { useState, useContext, useEffect, Fragment } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../../hooks/useDocTitle';
import FilterBar from '../../components/filters/FilterBar';
import ProductCard from '../../components/product/ProductCard';
import Services from '../../components/common/Services';
import filtersContext from '../../contexts/filters/filtersContext';
import EmptyView from '../../components/common/EmptyView';
import { useRouter } from 'next/router';
import commonContext from '../../contexts/common/commonContext';
import ReactPaginate from 'react-paginate';

const AllProducts = () => {
    const router = useRouter();
    const { query } = router;
    const keyword = query?.keyword;
    const category = query.product ? decodeURIComponent(query.product) : '';
    const [cat, setCat] = useState(0)
    const { allProducts, categoryMenu, updatedProducts } = useContext(filtersContext);

    const { searchResults, setSearchResults } = useContext(commonContext);

    useEffect(() => {
        if (category) {
            setCat(category)
        }
        if (cat) {
            categoryMenu(category);
        }
    }, [cat]);

    useDocTitle('best water purifier in pune');

    let pData = Object.keys(updatedProducts).length === 0 ? allProducts : updatedProducts

    if (keyword) {
        pData = pData.filter(item => item.name.toLowerCase().includes(keyword))
    }

    const items = pData

    // Pagination logic
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 16;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };


    return (
        <>
            <section id="all_products" className="section bg-poster" style={{ paddingTop: "2rem" }}>

                <FilterBar />

                <div className="scrollbar container">
                    {keyword ? (<h5 style={{ fontSize: "16px", padding: "0px 0px 10px 50px", marginBottom: "10px" }}>
                        Discover the <span style={{ color: "#0059A3" }}>{pData.length} </span>  result found for <span style={{ color: "#0059A3" }}>"{keyword} "</span> best water purifiers in pune for superior cleanliness and health!
                    </h5>) : ""}
                    {category ? (<h1 style={{ fontSize: "20px", fontWeight: "500", padding: "0px 0px 10px 10px" }}>
                        <b style={{ color: "#0059A3" }}>{category}</b>
                    </h1>) : ""}

                    {
                        pData && pData.length ? (
                            <>
                                <div className="wrapper products_wrapper">
                                    {currentItems?.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="Next"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="Prev"
                                    renderOnZeroPageCount={null}
                                    breakClassName={'page-item'}
                                    breakLinkClassName={'page-link'}
                                    containerClassName={'pagination'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                />

                            </>
                        ) : (
                            <EmptyView
                                icon={<BsExclamationCircle />}
                                msg="No Results Found"
                            />
                        )
                    }
                </div>
            </section>
            <Services />
        </>
    );
};

export default AllProducts;