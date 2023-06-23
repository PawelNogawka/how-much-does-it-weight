"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCreate } from "@/hooks/useCreate";
import { useUpdate } from "@/hooks/useUpdate";
import { useAuthContext } from "@/hooks/useAuthContext";

import { categories } from "@/data/categories";

import Modal from "./Modal";

import CategoryInput from "../formElements/CategoryInput.jsx";
import PhotoInput from "../formElements/PhotoInput";
import HealthInput from "../formElements/HealthInput";
import ModalButtons from "./ModalButtons";
import Input from "../formElements/Input";
import Button from "../formElements/Button";

import "./Rent.scss";

const STEPS = {
  CATEGORY: "CATEGORY",
  IMAGE: "IMAGE",
  INFO: "INFO",
  HEALTH: "HEALTH",
  INGREDIENT: "INGREDIENT",
  VITAMINS: "VITAMINS",
  MINERALS: "MINERALS",
};

const Rent = ({ setShowModal, mode, product }) => {
  const [step, setStep] = useState(STEPS.CATEGORY);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [image, setImage] = useState({
    photo: "",
    amount: "",
  });
  const [imageError, setImageError] = useState({
    photo: null,
    amount: null,
  });

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);

  const [desc, setDesc] = useState("");
  const [descError, setDescError] = useState(null);

  const [nutrition, setNutrition] = useState({
    protein: "",
    fat: "",
    carbs: "",
    fiber: "",
    salt: "",
  });

  const [nutritionError, setNutritionError] = useState({
    protein: null,
    fat: null,
    carbs: null,
    fiber: null,
    salt: null,
  });

  const [minerals, setMinerals] = useState({
    calcium: "",
    iron: "",
    magnesium: "",
    potassium: "",
    sodium: "",
    zinc: "",
    selenium: "",
    manganese: "",
    copper: "",
  });

  const [mineralsError, setMineralsError] = useState({
    calcium: null,
    iron: null,
    magnesium: null,
    potassium: null,
    sodium: null,
    zinc: null,
    selenium: null,
    manganese: null,
    copper: null,
  });

  const [vitamins, setVitamins] = useState({
    a: "",
    b1: "",
    b2: "",
    b3: "",
    b6: "",
    b12: "",
    c: "",
    d: "",
    e: "",
  });

  const [vitaminsError, setVitaminsError] = useState({
    a: null,
    b1: null,
    b2: null,
    b3: null,
    b6: null,
    b12: null,
    c: null,
    d: null,
    e: null,
  });

  const [health, setHealth] = useState([]);

  const handleHealthRemoveBtnClick = (item) => {
    const updatedHealth = health.filter((healthItem) => healthItem !== item);
    setHealth(updatedHealth);
  };

  useEffect(() => {
    if (!product || mode !== "edit") return;

    const updatedNutrition = {
      protein: "",
      fat: "",
      carbs: "",
      fiber: "",
      salt: "",
    };

    product.nutrition.standard.forEach((item, index) => {
      const { name, amount, unit } = item;

      if (name !== "energy") {
        updatedNutrition[name] = `${amount}`;
      }
    });

    setNutrition(updatedNutrition);
    setSelectedCategory(product.category);
    setImage({
      photo: product.image.photo,
      amount: product.image.amount,
    });
    setTitle(product.title);
    setDesc(product.description);

    const updatedMinerals = {
      calcium: "",
      iron: "",
      magnesium: "",
      potassium: "",
      sodium: "",
      zinc: "",
      selenium: "",
      manganese: "",
      copper: "",
    };

    product.minerals.standard.forEach((item, index) => {
      const { name, amount, unit } = item;
      updatedMinerals[name] = `${amount}`;
    });

    setMinerals(updatedMinerals);

    const updatedVitamins = {
      a: "",
      b1: "",
      b2: "",
      b3: "",
      b6: "",
      b12: "",
      c: "",
      d: "",
      e: "",
    };

    product.vitamins.standard.forEach((item, index) => {
      const { name, amount, unit } = item;
      updatedVitamins[name] = `${amount}`;
    });

    setVitamins(updatedVitamins);

    setHealth(product.healthFeatures);
  }, [mode, product]);

  const router = useRouter();

  const { create, isLoading: isCreating, error: createError } = useCreate();
  const { update, isLoading: isUpdating, error: updateError } = useUpdate();

  const { user } = useAuthContext();

  const buttonsRef = useRef(null);

  const handleNextStepBtnClick = () => {
    setStep((prevStep) => {
      if (prevStep === STEPS.PRICE) {
        return prevStep;
      } else {
        return Object.values(STEPS)[Object.keys(STEPS).indexOf(prevStep) + 1];
      }
    });
  };

  const handlePreviousStepBtnClick = () => {
    setStep((prevStep) => {
      if (prevStep === STEPS.CATEGORY) {
        return prevStep;
      } else {
        return Object.values(STEPS)[Object.keys(STEPS).indexOf(prevStep) - 1];
      }
    });
  };

  const handleCategoryInputClick = (categoryName) => {
    buttonsRef.current?.scrollIntoView({ behavior: "smooth" });
    setSelectedCategory(categoryName);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let error = null;

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required.";
        }
        setNameError(error);
        setName(value);
        break;

      case "title":
        if (!value.trim()) {
          error = "Title is required.";
        } else if (value.length < 5) {
          error = "Title must have at least 5 characters";
        }
        setTitleError(error);
        setTitle(value);
        break;

      case "description":
        if (!value.trim()) {
          error = "Description is required.";
        } else if (value.length < 20) {
          error = "The description must contain a minimum of 20 characters.";
        }
        setDescError(error);
        setDesc(value);
        break;

      case "price":
        if (!value.trim()) {
          error = "Price is required.";
        } else if (isNaN(parseFloat(value))) {
          error = "Price must be a number.";
        } else if (+value <= 0) {
          error = "Price must be positive.";
        }
        setPriceError(error);
        setPrice(value);
        break;

      case "imageAmount":
        if (!value.trim()) {
          error = "Amount is required.";
        } else if (value.startsWith("0")) {
          error = "Value cannot start with '0'";
        } else if (isNaN(value)) {
          error = "Value must be a number.";
        } else if (value < 0) {
          error = "Value must be positive";
        } else if (value > 9999) {
          error = "It does not seem that any product weighs 10 kg";
        }
        setImageError((prev) => ({ ...prev, amount: error }));
        setImage((prev) => ({ ...prev, amount: value }));
        break;

      default:
        break;
    }
  };

  const handleNutritionInputChange = (event) => {
    const { name, value } = event.target;

    let error = null;

    if (!value.trim()) {
      error = "Amount is required.";
    } else if (!/^\d+(\.\d+)?$/.test(value) || /^0\d/.test(value)) {
      error = "Amount must be a number.";
    } else if (+value < 0) {
      error = "Amount must be positive.";
    } else if (+value > 999) {
      error = "Amount must be lower than 1000.";
    }

    setNutritionError((prev) => ({ ...prev, [name]: error }));
    setNutrition((prev) => ({ ...prev, [name]: value }));
  };

  const handleVitaminsInputChange = (event) => {
    const { name, value } = event.target;

    let error = null;

    if (!value.trim()) {
      error = "Amount is required.";
    } else if (!/^\d+(\.\d+)?$/.test(value) || /^0\d/.test(value)) {
      error = "Amount must be a number.";
    } else if (+value < 0) {
      error = "Amount must be positive.";
    } else if (+value > 99999) {
      error = "Amount must be lower than 100000.";
    }

    setVitaminsError((prev) => ({ ...prev, [name]: error }));
    setVitamins((prev) => ({ ...prev, [name]: value }));
  };

  const handleMineralsInputChange = (event) => {
    const { name, value } = event.target;

    let error = null;

    if (!value.trim()) {
      error = "Amount is required.";
    } else if (!/^\d+(\.\d+)?$/.test(value) || /^0\d/.test(value)) {
      error = "Amount must be a number.";
    } else if (+value < 0) {
      error = "Amount must be positive.";
    } else if (+value > 99999) {
      error = "Amount must be lower than 100000.";
    }

    setMineralsError((prev) => ({ ...prev, [name]: error }));
    setMinerals((prev) => ({ ...prev, [name]: value }));
  };

  const isStepValid = () => {
    if (step === STEPS.CATEGORY) {
      return !!selectedCategory;
    } else if (step === STEPS.IMAGE) {
      console.log(image);
      const imageErrorValues = Object.values(imageError);
      const isImageErrorNull = imageErrorValues.every(
        (error) => error === null
      );
      return !!image.photo && !!image.amount && isImageErrorNull;
    } else if (step === STEPS.INGREDIENT) {
      const nutritionValues = Object.values(nutrition);
      const anyFieldEmpty = nutritionValues.some(
        (value) => value.trim() === ""
      );
      const nutritionErrorValues = Object.values(nutritionError);
      const anyErrorNull = nutritionErrorValues.some((error) => error !== null);
      return anyFieldEmpty || anyErrorNull;
    } else if (step === STEPS.INFO) {
      return (
        !descError &&
        !titleError &&
        !!title.trim() &&
        !!desc.trim() &&
        !!name.trim()
      );
    } else if (step === STEPS.HEALTH) {
      return health.length === 0;
    } else if (step === STEPS.VITAMINS) {
      const vitaminsErrorValues = Object.values(vitaminsError);
      const anyFieldEmpty = Object.values(vitamins).some(
        (value) => value.trim() === ""
      );
      const anyErrorNull = vitaminsErrorValues.some((error) => error !== null);
      return anyFieldEmpty || anyErrorNull;
    } else if (step === STEPS.MINERALS) {
      const mineralsErrorValues = Object.values(mineralsError);
      const anyFieldEmpty = Object.values(minerals).some(
        (value) => value.trim() === ""
      );
      const anyErrorNull = mineralsErrorValues.some((error) => error !== null);
      return anyFieldEmpty || anyErrorNull;
    }

    return false;
  };

  const handleCreateBtnClick = async () => {
    if (!user._id) return;

    const nutritionStandard = Object.entries(nutrition).map(([key, value]) => {
      return {
        name: key,
        amount: +value,
        unit: "g",
      };
    });

    const vitaminsStandard = Object.entries(vitamins).map(([key, value]) => {
      let unit = "mg";
      if (key === "a" || key === "d") {
        unit = "IU";
      } else if (key === "b12") {
        unit = "ug";
      }
      return {
        name: key,
        amount: +value,
        unit: unit,
      };
    });

    const mineralsStandard = Object.entries(minerals).map(([key, value]) => {
      let unit = "mg";
      if (key === "potassium" || key === "sodium") {
        unit = "g";
      } else if (key === "selenium") {
        unit = "ug";
      }
      return {
        name: key,
        amount: +value,
        unit: unit,
      };
    });

    const photoWeight = {
      nutrition: Object.entries(nutrition).map(([key, value]) => {
        let unit = "g";
        return {
          name: key,
          amount: +value * (image.amount / 100),
          unit: unit,
        };
      }),
      vitamins: Object.entries(vitamins).map(([key, value]) => {
        let unit = "mg";
        if (key === "a" || key === "d") {
          unit = "IU";
        } else if (key === "b12") {
          unit = "ug";
        }
        return {
          name: key,
          amount: +value * (image.amount / 100),
          unit: unit,
        };
      }),
      minerals: Object.entries(minerals).map(([key, value]) => {
        let unit = "mg";
        if (key === "potassium" || key === "sodium" || key === "magnesium") {
          unit = "g";
        } else if (key === "selenium") {
          unit = "ug";
        }
        return {
          name: key,
          amount: +value * (image.amount / 100),
          unit: unit,
        };
      }),
    };

    const formData = {
      creator: user?._id,
      category: selectedCategory,
      image: {
        ...image,
        amount: +image.amount,
      },
      name: name,
      title: title,
      description: desc,
      healthFeatures: health,
      nutrition: {
        standard: nutritionStandard,
        photoWeight: photoWeight.nutrition,
      },
      vitamins: {
        standard: vitaminsStandard,
        photoWeight: photoWeight.vitamins,
      },
      minerals: {
        standard: mineralsStandard,
        photoWeight: photoWeight.minerals,
      },
    };

    if (mode == "edit" && product) {
      const url = `/api/products/${product._id}/edit/${user._id}`;
      await update(url, formData);
    } else {
      const url = "/api/products/new";
      await create(url, formData);
    }

    setShowModal("");
    router.push(`/user/${user._id}#added`);
  };

  const renderCategoryStep = () => (
    <div className="rent">
      <ul className="rent__categories">
        {categories.map((category) => (
          <li key={category.name}>
            <CategoryInput
              icon={category.icon}
              category={category.name}
              description={category.desc}
              selected={selectedCategory == category.name}
              onClick={() => handleCategoryInputClick(category.name)}
            />
          </li>
        ))}
      </ul>
      <div ref={buttonsRef}>
        <ModalButtons
          submitBtnValue="Continue"
          handleSubmitBtnClick={handleNextStepBtnClick}
          disabled={!isStepValid()}
        />
      </div>
    </div>
  );

  const renderImageStep = () => (
    <div className="rent">
      <div className="rent__row">
        <PhotoInput
          label="uplad an image"
          setValues={setImage}
          values={image}
          errors={imageError}
          setErrors={setImageError}
          ariaLabel="Add a photo"
        />
        {imageError.photo && (
          <span className="rent__error">{imageError.photo}</span>
        )}

        <Input
          error={imageError.amount}
          type="text"
          placeholder="54"
          value={image.amount}
          label={"how many grams is on photo?"}
          onChange={handleInputChange}
          name="imageAmount"
          id="imageAmount"
        />
      </div>
      <ModalButtons
        submitBtnValue="Continue"
        secondButtonValue="Back"
        handleSecondBtnClick={handlePreviousStepBtnClick}
        handleSubmitBtnClick={handleNextStepBtnClick}
        disabled={!isStepValid()}
      />
    </div>
  );

  const renderInfoStep = () => (
    <div className="rent">
      <div className="rent__row">
        <Input
          error={nameError}
          type="text"
          placeholder="Grain"
          value={name}
          label="Name of your product"
          onChange={handleInputChange}
          name="name"
          id="name"
        />
        <Input
          error={titleError}
          type="text"
          placeholder="One whole grain"
          value={title}
          label="title"
          onChange={handleInputChange}
          name="title"
          id="title"
        />
        <Input
          error={descError}
          type="textarea"
          placeholder="One whole grain is awesome..."
          value={desc}
          label="description"
          onChange={handleInputChange}
          name="description"
          id="description"
        />
      </div>

      <ModalButtons
        submitBtnValue="Continue"
        secondButtonValue="Back"
        handleSecondBtnClick={handlePreviousStepBtnClick}
        handleSubmitBtnClick={handleNextStepBtnClick}
        disabled={!isStepValid()}
      />
    </div>
  );

  const renderHealthStep = () => {
    return (
      <div className="rent">
        <div className="rent__row">
          {health.map((item,index) => (
            <div key={index} className="rent__box">
              <h3 className="rent__box-title">{item.title}</h3>
              <div className="rent-box__desc">{item.desc}</div>
              <Button
                small
                dark
                onClick={() => handleHealthRemoveBtnClick(item)}
                ariaLabel="Remove health feature"
              >
                remove
              </Button>
            </div>
          ))}
          <HealthInput setHealth={setHealth} />
        </div>

        <ModalButtons
          submitBtnValue="Continue"
          secondButtonValue="Back"
          handleSecondBtnClick={handlePreviousStepBtnClick}
          handleSubmitBtnClick={handleNextStepBtnClick}
          disabled={health.length === 0}
        />
      </div>
    );
  };

  const renderIngredientStep = () => (
    <div className="rent">
      <div className="rent__row">
        <div className="rent__row-group">
          <Input
            sufiks="g /100g"
            error={nutritionError.protein}
            value={nutrition.protein}
            onChange={handleNutritionInputChange}
            label="Protein"
            placeholder="2"
            id="protein"
            name="protein"
            ariaLabel="Enter amount of proteins in 100g of product"
          />
          <Input
            sufiks="g /100g"
            error={nutritionError.fat}
            value={nutrition.fat}
            onChange={handleNutritionInputChange}
            label="Fat"
            placeholder="2"
            id="fat"
            name="fat"
            ariaLabel="Enter amount of fats in 100g of product"
          />
          <Input
            sufiks="g /100g"
            error={nutritionError.carbs}
            value={nutrition.carbs}
            onChange={handleNutritionInputChange}
            label="Carbs"
            placeholder="2"
            id="carbs"
            name="carbs"
            ariaLabel="Enter amount of carbs in 100g of product"
          />
        </div>
        <div className="rent__row-group">
          <Input
            sufiks="g /100g"
            error={nutritionError.fiber}
            value={nutrition.fiber}
            onChange={handleNutritionInputChange}
            label="Fiber"
            placeholder="0.2"
            id="fiber"
            name="fiber"
            ariaLabel="Enter amount of fiber in 100g of product"
          />
          <Input
            sufiks="g /100g"
            error={nutritionError.salt}
            value={nutrition.salt}
            onChange={handleNutritionInputChange}
            label="Salt / Sodium"
            placeholder="0.2"
            id="salt"
            name="salt"
            ariaLabel="Enter amount of salt in 100g of product"
          />
        </div>
      </div>

      <ModalButtons
        submitBtnValue="Continue"
        secondButtonValue="Back"
        handleSecondBtnClick={handlePreviousStepBtnClick}
        handleSubmitBtnClick={handleNextStepBtnClick}
        disabled={isStepValid()}
      />
    </div>
  );

  const renderVitaminsStep = () => (
    <div className="rent">
      <div className="rent__row">
        <div className="rent__row-group">
          <Input
            sufiks=" mg  /100g"
            error={vitaminsError.b1}
            value={vitamins.b1}
            onChange={handleVitaminsInputChange}
            label="Vitamin b1"
            placeholder="2"
            id="b1"
            name="b1"
            ariaLabel="Enter amount of vitamin b1 in 100mg of product"
          />
          <Input
            sufiks=" mg  /100g"
            error={vitaminsError.b2}
            value={vitamins.b2}
            onChange={handleVitaminsInputChange}
            label="vitamin b2"
            placeholder="2"
            id="b2"
            name="b2"
            ariaLabel="Enter amount of vitamin b2 in 100mg of product"
          />
          <Input
            sufiks=" mg  /100g"
            error={vitaminsError.b3}
            value={vitamins.b3}
            onChange={handleVitaminsInputChange}
            label="Vitamin b3"
            placeholder="2"
            id="b3"
            name="b3"
            ariaLabel="Enter amount of vitamin b3 in 100mg of product"
          />
        </div>
        <div className="rent__row-group">
          <Input
            sufiks=" mg  /100g"
            error={vitaminsError.b6}
            value={vitamins.b6}
            onChange={handleVitaminsInputChange}
            label="Vitamin b6"
            placeholder="0.2"
            id="b6"
            name="b6"
            ariaLabel="Enter amount of b6 vitamin in 100mg of product"
          />
          <Input
            sufiks=" ug  /100g"
            error={vitaminsError.b12}
            value={vitamins.b12}
            onChange={handleVitaminsInputChange}
            label="Vitamin b12"
            placeholder="0.2"
            id="b12"
            name="b12"
            ariaLabel="Enter amount of vitamin b12 in 100mg of product"
          />
          <Input
            sufiks=" iu  /100g"
            error={vitaminsError.a}
            value={vitamins.a}
            onChange={handleVitaminsInputChange}
            label="Vitamin a"
            placeholder="0.2"
            id="a"
            name="a"
            ariaLabel="Enter amount of vitamin a in 100mg of product"
          />
        </div>
        <div className="rent__row-group">
          <Input
            sufiks=" mg /100g"
            error={vitaminsError.c}
            value={vitamins.c}
            onChange={handleVitaminsInputChange}
            label="Vitamin c"
            placeholder="0.2"
            id="c"
            name="c"
            ariaLabel="Enter amount of vitamin c in 100mg of product"
          />
          <Input
            sufiks=" iu /100g"
            error={vitaminsError.d}
            value={vitamins.d}
            onChange={handleVitaminsInputChange}
            label="Vitamin d"
            placeholder="0.2"
            id="d"
            name="d"
            ariaLabel="Enter amount of vitamin d in 100mg of product"
          />
          <Input
            sufiks=" mg /100g"
            error={vitaminsError.e}
            value={vitamins.e}
            onChange={handleVitaminsInputChange}
            label="Vitamin e"
            placeholder="0.2"
            id="e"
            name="e"
            ariaLabel="Enter amount of vitamin e in 100mg of product"
          />
        </div>
      </div>
      <ModalButtons
        submitBtnValue="Continue"
        secondButtonValue="Back"
        handleSecondBtnClick={handlePreviousStepBtnClick}
        handleSubmitBtnClick={handleNextStepBtnClick}
        disabled={isStepValid()}
      />
    </div>
  );

  const renderMineralsStep = () => (
    <div className="rent">
      <div className="rent__row">
        <div className="rent__row-group">
          <Input
            sufiks=" mg /100g"
            error={mineralsError.calcium}
            value={minerals.calcium}
            onChange={handleMineralsInputChange}
            label="Calcium / Ca"
            placeholder="2"
            id="calcium"
            name="calcium"
            ariaLabel="Enter amount of calcium in 100mg of product"
          />
          <Input
            sufiks=" mg /100g"
            error={mineralsError.iron}
            value={minerals.iron}
            onChange={handleMineralsInputChange}
            label="Iron / Fe"
            placeholder="2"
            id="iron"
            name="iron"
            ariaLabel="Enter amount of iron in 100mg of product"
          />
          <Input
            sufiks=" g /100g"
            error={mineralsError.magnesium}
            value={minerals.magnesium}
            onChange={handleMineralsInputChange}
            label="Magnesium"
            placeholder="2"
            id="magnesium"
            name="magnesium"
            ariaLabel="Enter amount of magnesium in 100mg of product"
          />
        </div>
        <div className="rent__row-group">
          <Input
            sufiks=" g /100g"
            error={mineralsError.potassium}
            value={minerals.potassium}
            onChange={handleMineralsInputChange}
            label="Potassium"
            placeholder="2"
            id="potassium"
            name="potassium"
            ariaLabel="Enter amount of potassium in 100mg of product"
          />
          <Input
            sufiks=" g /100g"
            error={mineralsError.sodium}
            value={minerals.sodium}
            onChange={handleMineralsInputChange}
            label="Sodium"
            placeholder="2"
            id="sodium"
            name="sodium"
            ariaLabel="Enter amount of sodium in 100mg of product"
          />

          <Input
            sufiks=" mg /100g"
            error={mineralsError.zinc}
            value={minerals.zinc}
            onChange={handleMineralsInputChange}
            label="Zinc"
            placeholder="0.2"
            id="zinc"
            name="zinc"
            ariaLabel="Enter amount of zinc in 100mg of product"
          />
        </div>
        <div className="rent__row-group">
          <Input
            sufiks=" ug /100g"
            error={mineralsError.selenium}
            value={minerals.selenium}
            onChange={handleMineralsInputChange}
            label="Selenium"
            placeholder="0.2"
            id="selenium"
            name="selenium"
            ariaLabel="Enter amount of selenium in 100mg of product"
          />
          <Input
            sufiks=" mg /100g"
            error={mineralsError.manganese}
            value={minerals.manganese}
            onChange={handleMineralsInputChange}
            label="Manganese"
            placeholder="0.2"
            id="manganese"
            name="manganese"
            ariaLabel="Enter amount of manganese in 100mg of product"
          />
          <Input
            sufiks=" mg /100g"
            error={mineralsError.copper}
            value={minerals.copper}
            onChange={handleMineralsInputChange}
            label="Copper"
            placeholder="0.2"
            id="copper"
            name="copper"
            ariaLabel="Enter amount of copper in 100mg of product"
          />
        </div>
      </div>
      {updateError && <span>{updateError.message}</span>}
      <ModalButtons
        submitBtnValue={
          isCreating
            ? "Creating..."
            : isUpdating
            ? "Updating..."
            : mode === "edit"
            ? "Edit"
            : "Create"
        }
        secondButtonValue="Back"
        handleSecondBtnClick={handlePreviousStepBtnClick}
        handleSubmitBtnClick={handleCreateBtnClick}
        disabled={isStepValid() || isCreating || isUpdating}
      />
    </div>
  );

  let body = null;

  switch (step) {
    case STEPS.CATEGORY:
      body = renderCategoryStep();
      break;
    case STEPS.INGREDIENT:
      body = renderIngredientStep();
      break;
    case STEPS.INFO:
      body = renderInfoStep();
      break;
    case STEPS.HEALTH:
      body = renderHealthStep();
      break;
    case STEPS.IMAGE:
      body = renderImageStep();
      break;
    case STEPS.VITAMINS:
      body = renderVitaminsStep();
      break;
    case STEPS.MINERALS:
      body = renderMineralsStep();
      break;
    default:
      break;
  }
  const heading =
    step === STEPS.CATEGORY
      ? "Category"
      : step === STEPS.INGREDIENT
      ? "Ingredients"
      : step === STEPS.INFO
      ? "Information"
      : step === STEPS.IMAGE
      ? "Image"
      : step === STEPS.VITAMINS
      ? "Vitamins"
      : step === STEPS.HEALTH
      ? "Health"
      : "Minerals";

  const subtitle =
    step === STEPS.CATEGORY
      ? "Choose the category that best describes your pin"
      : step === STEPS.INGREDIENT
      ? "Enter the nutrients your product contains"
      : step === STEPS.INFO
      ? "Provide information about your pin"
      : step === STEPS.IMAGE
      ? "Upload an image of your pin"
      : step === STEPS.VITAMINS
      ? "Enter the vitamins your product contains"
      : step === STEPS.HEALTH
      ? "Provide health features of your product"
      : "Enter the minerals your product contains";

  const label = mode !== "edit" ? "Create your own pin!" : "Edit your product";

  return (
    <Modal
      body={body}
      label={label}
      title={heading}
      subtitle={subtitle}
      setShowModal={setShowModal}
    />
  );
};

export default Rent;
