import { render, screen, waitFor, act } from '@testing-library/react';
import BodegaTable from '@/components/tables/bodegasTable';
import { BODEGA_DATA, MOCK_COLUMNS } from '../__mocks__/bodegaData';

let documentBody;

describe('when a set of bodegas is sent to bodegas table', () => {
  it('should render a list of bodegas with their information', async () => {
    //Act
    documentBody = render(
      <BodegaTable
        bodegasQuery=''
        columns={MOCK_COLUMNS}
        handleChangeQuery={() => {}}
        handleSearchBodegas={() => {}}
        rows={BODEGA_DATA}
      />
    );
    //Assert
    await waitFor(() => {
      expect(screen.getByText('BODEGA1')).toBeInTheDocument();
      expect(screen.getByText('BODEGA2')).toBeInTheDocument();
    });
  });
});
