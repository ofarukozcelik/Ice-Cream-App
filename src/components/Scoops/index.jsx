import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card";

const Scoops = () => {
    const [data, setData] = useState([]);
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4090/scoops").then((res) => setData(res.data));
    }, []);

    // Sepete ekle
    const addToBasket = (item) => {
        // Sepette bu elemandan var mı ?
        const found = basket.find((i) => i.id === item.id);

        if (found) {
            // Güncel nesneyi oluştur
            const updated = { ...found, amount: found.amount + 1 };

            // Diziyi güncelle
            const temp = basket.map((i) => (i.id === found.id ? updated : i));

            // State'i güncelle
            setBasket(temp);
        } else {
            // Yoksa sepete ekle
            setBasket([...basket, { ...item, amount: 1 }]);
        }
    };

    // Sepetten çıkar
    const removeFromBasket = (id) => {
        // Elemanı sepette bul?
        const found = basket.find((i) => i.id === id);

        if (found.amount > 1) {
            // Güncel nesneyi oluştur
            const updated = { ...found, amount: found.amount - 1 };

            // Diziyi güncelle
            const temp = basket.map((i) => (i.id === found.id ? updated : i));

            // State'i güncelle
            setBasket(temp);
        } else {
            // Yoksa sepetten kaldır
            setBasket(basket.filter((i) => i.id !== id));
        }
    };

    // Toplam fiyatı hesapla
    const total = basket.reduce((total, i) => total + i.amount * 20, 0);

    return (
        <div>
            <h1>Dondurma Çeşitleri</h1>

            <p>
                Tanesi <span className="text-success m-1">20</span>₺
            </p>

            <h3>
                Dondurma Ücreti{" "}
                <span data-testid="total" className="text-success m-1">
                    {total}
                </span>
                ₺
            </h3>

            <div className="p-3 row gap-5 mt-4 justify-content-between">
                {data.map((i) => {
                    // Ekrana basılacak elemanı sepette bul
                    const found = basket.find((item) => item.id === i.id);

                    return (
                        <Card
                            amount={found?.amount || 0}
                            addToBasket={addToBasket}
                            removeFromBasket={removeFromBasket}
                            item={i}
                            key={i.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Scoops;
