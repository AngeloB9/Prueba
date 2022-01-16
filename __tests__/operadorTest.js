import { render, screen, waitFor } from '@testing-library/react';
import OperadorTable from '@/components/tables/operadoresTable';
import { OPERADOR_DATA, MOCK_COLUMNS } from '../__mocks__/operadorData';

let documentBody;

describe('when a set of operadores is sent to operadores table', () => {
  it('should render a list of operadores with their information', async () => {
    //Act
    documentBody = render(
      <OperadorTable
        operadoresQuery=''
        columns={MOCK_COLUMNS}
        handleChangeQuery={() => {}}
        handleSearchOperadores={() => {}}
        rows={OPERADOR_DATA}
      />
    );
    //Assert
    await waitFor(() => {
      expect(screen.getByText('Angelo Gabriel')).toBeInTheDocument();
      expect(screen.getByText('Juan Jose')).toBeInTheDocument();
    });
  });
});
