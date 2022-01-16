import { render, screen, waitFor, act } from '@testing-library/react';
import ProveedorTable from '@/components/tables/proveedoresTable';
import { PROVEEDOR_DATA, MOCK_COLUMNS } from '../__mocks__/proveedorData';

let documentBody;

describe('when a set of proveedores is sent to proveedores table', () => {
  it('should render a list of proveedores with their information', async () => {
    //Act
    documentBody = render(
      <ProveedorTable
        proveedoresQuery=''
        columns={MOCK_COLUMNS}
        handleChangeQuery={() => {}}
        handleSearchproveedores={() => {}}
        rows={PROVEEDOR_DATA}
      />
    );
    //Assert
    await waitFor(() => {
      expect(screen.getByText('DSS1')).toBeInTheDocument();
      expect(screen.getByText('DSS2')).toBeInTheDocument();
    });
  });
});
