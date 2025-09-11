import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import FormButterfly from '../components/FormButterfly';

describe('FormButterfly component', () => {
  it('calls onSubmit with form data when submit button is clicked', async () => {
    // Mock de fetch para evitar llamada real a Cloudinary, responde con unobjeto con publicId falso
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ public_id: 'fake_public_id' }),
      })
    );
    // Mock para la función onSubmit que se pasará al componente, para verificar que se llame correctamente
    const mockOnSubmit = vi.fn();

    render(<FormButterfly onSubmit={mockOnSubmit} />);

    // Rellenar campos obligatorios
    fireEvent.change(screen.getByLabelText(/nombre común/i), { target: { value: 'Mariposa' } });
    fireEvent.change(screen.getByLabelText(/nombre científico/i), { target: { value: 'Papilio machaon' } });
    fireEvent.change(screen.getByLabelText(/familia/i), { target: { value: 'Papilionidae' } });
    fireEvent.change(screen.getByLabelText(/región/i), { target: { value: 'Australia' } });
    fireEvent.change(screen.getByLabelText(/nivel de amenaza/i), { target: { value: 'vulnerable' } });

    // Envía el formulario
    fireEvent.click(screen.getByRole('button', { name: /guardar mariposa/i }));

    // Esperar que se haya llamado onSubmit, con espera para el async
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

  
    // Limpiar mock de fetch
    global.fetch.mockRestore();
  });
});