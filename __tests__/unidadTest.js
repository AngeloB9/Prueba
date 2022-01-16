import { render, screen, waitFor } from '@testing-library/react';
import UnidadesTable from '@/components/tables/unidadesTable';
import { UNIDAD_DATA, MOCK_COLUMNS } from '../__mocks__/unidadData';

let documentBody;

describe('when a set of unidades is sent to unidades table', () => {
  it('should render a list of unidades with their information', async () => {
    //Act
    documentBody = render(
      <UnidadesTable
        unidadesQuery=''
        columns={MOCK_COLUMNS}
        handleChangeQuery={() => {}}
        handleSearchUnidades={() => {}}
        rows={UNIDAD_DATA}
      />
    );
    //Assert
    await waitFor(() => {
      expect(screen.getByText('metro')).toBeInTheDocument();
      expect(screen.getByText('kilogramo')).toBeInTheDocument();
    });
  });
});
