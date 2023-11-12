import Card from "./components/Card";
import FoodList from "./components/FoodList";
import Header from "./components/Header";
import ConfirmForm from "./components/ConfirmForm";
import styles from "./css/App.module.css";
import CardMassaging from "./components/CardMassaging";
import { useContext, useState, useEffect } from "react";
import AuthContext from "./context/AuthContext";
function App() {
  const [foodData, setFoodData] = useState([]);

  const [httpError, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const DataFunc = async () => {
      const response = await fetch(
        "https://react-pj-74-default-rtdb.firebaseio.com/Foods.json"
      );

      if (!response.ok) {
        throw new Error("can't connect to server");
      }
      const jsData = await response.json();
      console.log(jsData);
      let dataArray = [];
      for (let key in jsData) {
        dataArray.push({
          id: jsData[key].id,
          key: jsData[key].key,
          name: jsData[key].name,
          title: jsData[key].title,
          price: jsData[key].price,
        });
      }
      console.log(dataArray);
      setIsLoading(false);
      setFoodData(dataArray);
    };

    DataFunc().catch((e) => {
      setIsLoading(false);
      setError(e.message);
      console.log(e.message);
    });
  }, []);

  const ctx = useContext(AuthContext);
  return (
    <div className={styles["display-styles"]}>
      {ctx.cardIsVisible1 && <CardMassaging />}
      <Header />
      <div className={styles.massage}>
        <h2>you deserve the best</h2>
        <div>choose you favorite food and Enjoy that</div>
      </div>
      <Card>
        {isLoading && <p>Loading ...</p>}
        {httpError && <p>{httpError}</p>}
        {foodData.map((food) => {
          return (
            <FoodList
              title={food.title}
              name={food.name}
              price={food.price}
              key={food.key}
              id={food.id}
            />
          );
        })}
      </Card>
    </div>
  );
}

export default App;
