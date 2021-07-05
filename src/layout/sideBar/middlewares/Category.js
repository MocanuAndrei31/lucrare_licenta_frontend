import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// REDUX
import { useSelector } from "react-redux";

const Category = ({ item, handleCloseSideBar }) => {
  const products = useSelector((state) => state.products.products);
  // console.log('ITEM', item);

  const [subcategory, setSubCategory] = useState(null);
  // const [closeSideBar, setCloseSideBar] = useState(false);
  const [openSubLinks, setOpenSubLinks] = useState(false);

  // const dispatch = useDispatch();

  useEffect(() => {
    // let subcategory = products.map((product) => product.sub_category).sort();
    let subcategory = products.filter((product) => product.category === item);
    let removeDuplicates = [...new Set(subcategory)];
    setSubCategory(removeDuplicates);
  }, [products, item]);

  const scrollWidthOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -110;
    window.scrollTo({
      top: yCoordinate + yOffset, //behavior: 'smooth'
    });
  };

  let arrLinks = [];
  const hai = products.filter((prod) => prod.category === item);
  const chooseSubCategory = hai.map((product) =>
    arrLinks.push(product.sub_category)
  );
  const elimDupLinks = [...new Set(arrLinks)];

  return (
    <li className="products-list">
      <button
        className="dropdown-btn"
        onClick={() => setOpenSubLinks(!openSubLinks)}
      >
        <span className={openSubLinks ? "rotate-subArrow" : null}>
          <i className="fas fa-caret-down"> </i>
        </span>
        {item}
      </button>

      <ul className={!openSubLinks ? "close-subLinks" : "open-subLinks"}>
        <Link
          to={"/" + item}
          className="dropdown-links"
          onClick={handleCloseSideBar}
        >
          All{" "}
        </Link>
        {elimDupLinks.map((ceva, i) => (
          <li key={i}>
            <HashLink
              to={"/" + item + "#" + ceva}
              //elementId={ceva}
              scroll={(el) => scrollWidthOffset(el)}
              onClick={handleCloseSideBar}
              key={i}
            >
              {ceva}
            </HashLink>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Category;
