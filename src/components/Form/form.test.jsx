import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";

test("Koşulların onaylanma durumuna göre buton aktifliği", () => {
    // 1) Test edilecek bileşen render edilir
    render(<Form />);

    // 2) Gerekli elementleri çağır (checkbox | button)
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    // 3) Checkbox tiklenmemiş mi kontrol et
    expect(checkbox).not.toBeChecked();

    // 4) Buton inaktif mi kontrol et
    expect(button).toBeDisabled();

    // 5) Checbox'ı tikle
    fireEvent.click(checkbox);

    // 6) Buton aktif mi kontrol et
    expect(button).toBeEnabled();

    // 7) Checbox'tan tiki kaldır
    fireEvent.click(checkbox);

    // 8) Buton inaktif mi kontrol et
    expect(button).toBeDisabled();
});

test("Butonun hover durumuna göre bildirim gözükür", () => {
    // 1) Formu renderla
    render(<Form />);

    // 2) Gerekli elementleri al
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");
    const alert = screen.getByText(/size gerçekten/i);

    // 3) Bildirimin ekranda olmadığını kontrol et
    expect(alert).not.toBeVisible();

    // 4) Checkbox'ı tikle
    fireEvent.click(checkbox);

    // 5) Mouse'u butonun üzerine getir
    fireEvent.mouseEnter(button);

    // 6) Ekranda bildirim var mı kontrol et
    expect(alert).toBeVisible();

    // 7) Mouse'u butondan çek
    fireEvent.mouseLeave(button);

    // 8) Bildirimin ekranda olmadığını kontrol et
    expect(alert).not.toBeVisible();
});
