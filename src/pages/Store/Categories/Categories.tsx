import { FC, Fragment } from "react";
import useSoftNavigate from 'hooks/useSoftNavigate';
import Slider from "react-slick";
import useResponsiveViewport from "hooks/useResponsiveViewport";
import categories from "../../../services/categoryItems";
import "./Categories.scss";

interface Category {
	title: string;
	link: string;
	img: string;
	gradRGP: string;
}

const Categories: FC = () => {
	const navigate = useSoftNavigate();
	const isViewport960 = useResponsiveViewport(960);

	const categoriesSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		autoplay: false,
		fade: true,
	};

	const renderCategory = (category: Category, key: string) => (
    <a
      className="category-item"
      onClick={e => {
        navigate(category.link, e);
      }}
      key={key}
    >
      <img src={category.img} alt={category.title} />
      <div
        className="category-gradient"
        style={{
          background: `linear-gradient(rgba(0,0,0,0), rgb(${category.gradRGP}) 100%)`,
        }}
      />
      <div className="category-label">
        <span>{category.title}</span>
      </div>
    </a>
  );

	const renderCategoryGroup = (categoryGroup: Category[], groupIndex: number) => (
		<>
			{categoryGroup.map((category: Category, index: number) => (
				renderCategory(category, (groupIndex * 1000 + index).toString())
			))}
		</>
	);

	const categoryGroups = [
		categories.slice(0, 4),
		categories.slice(4, 8),
		categories.slice(8, 12),
		categories.slice(12, 16),
		categories.slice(16),
	];

	return (
		<div className="home-section">
			<div className="home-contents">
				{isViewport960 ? (
					<div className="mobile-mini">
							{categoryGroups.map((group, index) => (
								<Fragment key={index}>
									{renderCategoryGroup(group, index)}
								</Fragment>
							))}
					</div>
				) : (
					<>
						<div className="home-titles">BROWSE BY CATEGORY</div>
						<div className="mini-slides">
							<Slider {...categoriesSettings}>
								{categoryGroups.map((group, index) => (
									<div className="categories-row" key={index * 100}>
										{renderCategoryGroup(group, index)}
									</div>
								))}
							</Slider>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Categories;
