import NavBar from "../components/NavBar";
import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, test } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

describe("NavBar", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );
    });

    test('render NavBar component with logo', () => {
        const logoButterfly = screen.getAllByAltText(/Logo desktop/i)
        expect(logoButterfly).toBeDefined()
    })

    test('render NavBar title', () => {
        const titleRoute = screen.getAllByText(/POLINIZADORAS | Mariposas Oceania/i)
        expect(titleRoute).toBeDefined()
    })

    test('render button for list "explore" page', () => {
        const buttonList = screen.getAllByText(/explora/i)
        expect (buttonList).toBeDefined()
    })

describe("NavBar responsive", () => {
    beforeEach(() => {
        //simular pantalla movil
        window.innerWidth = 375;
        window.dispatchEvent(new Event("resize"));

        render(
            <MemoryRouter>
                <NavBar/>
            </MemoryRouter>
        );
    });

    test('shows hamburger menu button on mobile', () => {
        const hamburger = screen.getAllByLabelText(/toggle menu/i)
        expect(hamburger).toBeDefined()
    })
})

    test('Navigates to Home when title is clicked', async () => {
        render(
            <MemoryRouter inicialEntries={["/butterflylist"]}>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="*" element={<NavBar/>} />
                </Routes>
            </MemoryRouter>
    );

    const titleLink = screen.getByRole('link', {name: /POLINIZADORAS | Mariposas Oceania/i})
    await fireEvent.click(titleLink)

    //Ahora espera algo que exista solo en la Home:
    expect(screen.getByText(/Descubre las mariposas/i)).toBeDefined()
})

})