import { render, screen, waitFor, act } from '@testing-library/react';
import UserTable from '@/components/tables/userTable';
import { USER_DATA } from '../__mocks__/userData';

let documentBody;

describe('when a set of users is sent to user table', () => {
  it('should render a list of users with their information', async () => {
    //Act
    documentBody = render(
      <UserTable
        handleChangeQuery={() => {}}
        handleModalDelete={() => {}}
        handleSearchUsuarios={() => {}}
        usuarios={USER_DATA}
        usuariosQuery=''
      />
    );
    //Assert
    await waitFor(() => {
      expect(screen.getByText('Test 9')).toBeInTheDocument();
      expect(screen.getByText('Test 10')).toBeInTheDocument();
      expect(screen.getByText('Test 11')).toBeInTheDocument();
    });
  });
});
