import SectionHeading from "../uiElements/SectionHeading";
import PinList from "../pinElements/PinList";

const UserProducts = ({ id, subtitle, products, title }) => {
  return (
    <section id={id} className="section-padding full-width ">
      <SectionHeading subtitle={subtitle} title={title} />
      <PinList pins={products} />
    </section>
  );
};

export default UserProducts;
