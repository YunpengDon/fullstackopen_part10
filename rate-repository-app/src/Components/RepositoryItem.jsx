import { Text } from "react-native"

// type Item = {
//     id: string,
//     fullName: string,
//     description: string,
//     language: string,
//     forksCount: number,
//     stargazersCount: number,
//     ratingAverage: number,
//     reviewCount: number,
//     ownerAvatarUrl: number,
// }
// repository's full name, description, language, number of forks, number of stars, rating average and number of reviews. 
const RepositoryItem = ({item}) => {
  return (
    <Text>
      Full name: {item.fullName}
      {'\n'}
      Description: {item.description}
      {'\n'}
      Language: {item.language}
      {'\n'}
      Stars: {item.stargazersCount}
      {'\n'}
      Forks: {item.forksCount}
      {'\n'}f
      Reviews: {item.reviewCount}
      {'\n'}
      Rating: {item.ratingAverage}
    </Text>
  )
}

export default RepositoryItem