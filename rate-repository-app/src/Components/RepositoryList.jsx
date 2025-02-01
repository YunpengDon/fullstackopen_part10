import { useState, useEffect, useContext, useCallback } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Searchbar } from "react-native-paper";
import { useDebouncedCallback } from "use-debounce";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import LoadingSpinner from "./LoadingSpinner";

import FilterContext from "../contexts/FilterContext";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  dropdown: {
    marginHorizontal: 18,
    marginVertical: 6,
    height: 40,
    borderBottomColor: "gray",
    // borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  searchBar: {
    marginHorizontal: 12,
    marginTop: 12,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10, // 修改圆角
    height: 48,
    justifyContent: "center",
  },
  searchBarInput: {
    // margin: 12,
    lineHeight: 16,
    padding: 0,
    height: "100%",
    alignSelf: "center",
  },
});

// const repositories = [
//   {
//     id: "jaredpalmer.formik",
//     fullName: "jaredpalmer/formik",
//     description: "Build forms in React, without the tears",
//     language: "TypeScript",
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
//   },
//   {
//     id: "rails.rails",
//     fullName: "rails/rails",
//     description: "Ruby on Rails",
//     language: "Ruby",
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
//   },
//   {
//     id: "django.django",
//     fullName: "django/django",
//     description: "The Web framework for perfectionists with deadlines.",
//     language: "Python",
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
//   },
//   {
//     id: "reduxjs.redux",
//     fullName: "reduxjs/redux",
//     description: "Predictable state container for JavaScript apps",
//     language: "TypeScript",
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
//   },
// ];
const filter = [
  { label: "Latest repositories", value: "createdAt-descending" },
  { label: "Highest rated repositories", value: "rating-descending" },
  { label: "Lowest rated repositories", value: "rating-ascending" },
];

const filterVariables = (filterValue) => {
  switch (filterValue) {
    case "createdAt-descending":
      return {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      };
    case "rating-descending":
      return {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
    case "rating-ascending":
      return {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
    default:
      return {};
  }
};

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositorySearchBar = () => {
  const { searchKeyword, setSearchKeyword } = useContext(FilterContext);

  return (
    <Searchbar
      placeholder="Search"
      mode="view"
      style={styles.searchBar}
      inputStyle={styles.searchBarInput}
      onChangeText={setSearchKeyword}
      showDivider={false}
      elevation={1}
      value={searchKeyword}
      placeholderTextColor="grey"
    />
  );
};

const RepositoryFilterDropdown = () => {
  const { selectedFilter, setSelectedFilter } = useContext(FilterContext);
  return (
    <Dropdown
      data={filter}
      value={selectedFilter}
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      onChange={(item) => {
        setSelectedFilter(item.value);
      }}
    />
  );
};

export const RepositoryListContainer = ({ repositories, loading, error }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const ListEmptyComponent = ({ loading, error }) => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <Text>Error: {error}</Text>;
    }
  };

  const renderHeader = useCallback(() => {
    return (
      <>
        <RepositorySearchBar />
        <RepositoryFilterDropdown />
      </>
    );
  }, []);

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={
        <ListEmptyComponent loading={loading} error={error} />
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedFilter, setSelectedFilter] = useState("createdAt-descending");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { repositories, error, loading, refetch } = useRepositories({
    ...filterVariables(selectedFilter),
    searchKeyword,
  });

  const debouncedRefetch = useDebouncedCallback(() => {
    refetch({ ...filterVariables(selectedFilter), searchKeyword });
  }, 300);

  useEffect(() => {
    debouncedRefetch();
  }, [selectedFilter, searchKeyword]);

  if (loading && !repositories) {
    return <LoadingSpinner />;
  }

  if (repositories) {
    // Get the nodes from the edges array
    return (
      <FilterContext.Provider
        value={{
          selectedFilter,
          setSelectedFilter,
          searchKeyword,
          setSearchKeyword,
        }}
      >
        <RepositoryListContainer
          repositories={repositories}
          loading={loading}
          error={error}
        />
      </FilterContext.Provider>
    );
  }
};

export default RepositoryList;
