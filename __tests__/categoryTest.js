import { render, screen, waitFor, act } from '@testing-library/react';
import CategoryTable from '@/components/tables/categoryTable';
import { CATEGORY_DATA, MOCK_COLUMNS } from '../__mocks__/categoryData';

let documentBody;

describe('when a set of categories is sent to category table', () => {
  it('should render a list of categories with their information', async () => {
    //Act
    documentBody = render(
      <CategoryTable
        categoriesQuery=''
        columns={MOCK_COLUMNS}
        handleChangeQuery={() => {}}
        handleSearchCategories={() => {}}
        rows={CATEGORY_DATA}
      />
    );
    //Assert
    await waitFor(() => {
      expect(screen.getByText('TESTING CATEGORY')).toBeInTheDocument();
      expect(screen.getByText('SECOND TEST CATEGORY')).toBeInTheDocument();
    });
  });
});
