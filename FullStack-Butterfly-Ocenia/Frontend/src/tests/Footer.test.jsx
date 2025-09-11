import Footer from "../components/Footer.jsx"
import { render } from "@testing-library/react"
import { expect, test } from "vitest" 
import { screen, fireEvent } from "@testing-library/react"

test('renders footer content', () => {
    render(<Footer/>)
    const footerContent = screen.getByText(/Proyecto colaborativo desarrollado por 5 coders del bootcamp FemCoders de/i)
    expect(footerContent).toBeDefined()

})

test('el enlace de "Factoría F5" apunta a la URL correcta (método alternativo)', () => {
    render(<Footer />);
    const linkElement = screen.getByRole('link', { name: /Factoría F5/i });
    const href = linkElement.getAttribute('href');  
    expect(href).to.equal('https://factoriaf5.org');
});