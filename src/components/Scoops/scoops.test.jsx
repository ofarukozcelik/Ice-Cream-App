import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Scoops from "./index";



it("API'dan alınan veirler için ekrana kartlar basılır", async () => {
    render(<Scoops />);

    // Ekrana basılan kartları al
    const images = await screen.findAllByAltText("çeşit-resim");

    // Ekrandaki resimlerin (kartların) sayısı 1 den fazla mı ?
    expect(images.length).toBeGreaterThanOrEqual(1);
});

it("Çeşitlerin ekleme ve azaltma özelliklerinin toplam fiyata etkisi", async () => {
    // Userventin kurulumunu yap
    const user = userEvent.setup();

    // Test edilecek bileşen render edilir
    render(<Scoops />);

    // Bütün ekleme ve azaltma butonlarını çağır
    const addBtns = await screen.findAllByRole("button", { name: "Ekle" });
    const delBtns = await screen.findAllByRole("button", { name: "Azalt" });

    // Toplam fiyat elementini çağır
    const total = screen.getByTestId("total");

    // Toplam fiyat 0 mı kontrol et
    expect(total.textContent).toBe("0");

    // Chocalete'ın ekle butonuna tıkla
    await user.click(addBtns[2]);

    // Toplam fiyat 20 mi kontrol et
    expect(total.textContent).toBe("20");

    // Vanillanın ekle butonuna iki kez tıkla
    await user.dblClick(addBtns[1]);

    // Toplam fiyat 60 mi kontrol et
    expect(total.textContent).toBe("60");

    // Vanillanın azalt butonuna  tıkla
    await user.click(delBtns[1]);

    // Toplam fiyat 40 mı kontrol et
    expect(total.textContent).toBe("40");

    // Vanillanın azalt butonuna  tıkla
    await user.click(delBtns[1]);

    // Toplam fiyat 20 mı kontrol et
    expect(total.textContent).toBe("20");

    // Chocalte'ın azalt butonuna tıkla
    await user.click(delBtns[2]);

    // Toplam fiyat 0 mı kontrol et
    expect(total.textContent).toBe("0");
});
