import { executeQuery } from './database/db';

// Example INSERT query
const insertData = async () => {
  const query = 'INSERT INTO your_table (column1, column2) VALUES (?, ?)';
  const values = ['value1', 'value2'];

  try {
    const result = await executeQuery(query, values);
    console.log('Inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// a. [GET] /title/:titleID
const getTitleDetails = async (titleID) => {
  const query = `
  SELECT 
  tb.tconst AS titleID,
  tb.titleType AS type,
  tb.originalTitle,
  tb.img_url_asset AS titlePoster,
  tb.startYear,
  tb.endYear,
  tb.genres,
  GROUP_CONCAT(DISTINCT CONCAT(IFNULL(ta.region, 'N/A'), ':', IFNULL(ta.title, 'N/A')) SEPARATOR ',') AS akaTitlesWithRegion,
  GROUP_CONCAT(DISTINCT CONCAT(IFNULL(tp.nconst, 'N/A'), ':', IFNULL(p.primaryName, 'N/A'), ':', IFNULL(tp.category, 'N/A')) SEPARATOR ',') AS castAndCrew,
  COALESCE(tr.averageRating, 0) AS avRating,
  COALESCE(tr.numVotes, 0) AS nVotes
  FROM TitleBasics tb
  JOIN TitleAkas ta ON tb.tconst = ta.titleId
  JOIN TitlePrincipal tp ON tb.tconst = tp.tconst
  JOIN Person p ON tp.nconst = p.nconst
  LEFT JOIN TitleRating tr ON tb.tconst = tr.tconst  
  WHERE tb.tconst = ?
  `;

  try {
    const result = await executeQuery(query, titleID);
    console.log('Fetched data:', result);
    return result.length > 0 ? result[0] : null;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error
  }
};
// b. [GET] /searchtitle
const searchTitle = async(titlePart)=>{
  const query = `
  SELECT 
  tb.tconst AS titleID,
  tb.titleType AS type,
  tb.originalTitle,
  tb.img_url_asset AS titlePoster,
  tb.startYear,
  tb.endYear,
  tb.genres,
  GROUP_CONCAT(DISTINCT CONCAT(IFNULL(ta.region, 'N/A'), ':', IFNULL(ta.title, 'N/A')) SEPARATOR ',') AS akaTitlesWithRegion,
  GROUP_CONCAT(DISTINCT CONCAT(IFNULL(tp.nconst, 'N/A'), ':', IFNULL(p.primaryName, 'N/A'), ':', IFNULL(tp.category, 'N/A')) SEPARATOR ',') AS castAndCrew,
  COALESCE(tr.averageRating, 0) AS avRating,
  COALESCE(tr.numVotes, 0) AS nVotes
  FROM TitleBasics tb
  JOIN TitleAkas ta ON tb.tconst = ta.titleId
  JOIN TitlePrincipal tp ON tb.tconst = tp.tconst
  JOIN Person p ON tp.nconst = p.nconst
  LEFT JOIN TitleRating tr ON tb.tconst = tr.tconst
  WHERE tb.originalTitle LIKE CONCAT('%', ?, '%')
  GROUP BY tb.tconst;
  `;
try {
  const result = await executeQuery(query, titlePart);
  console.log('Fetched data:', result);
  return result.length > 0 ? result : null;

} catch (error) {
  console.error('Error fetching data:', error);
  throw error; // Rethrow the error
}

};

//c. [GET] /bygenre
const searchByGenre = async(qgenre, minrating, yrFrom, yrTo)=>{
  const query = `
  SELECT 
  tb.tconst AS titleID,
  tb.titleType AS type,
  tb.originalTitle,
  tb.img_url_asset AS titlePoster,
  tb.startYear,
  tb.endYear,
  tb.genres,
  GROUP_CONCAT(DISTINCT CONCAT(IFNULL(ta.region, 'N/A'), ':', IFNULL(ta.title, 'N/A')) SEPARATOR ',') AS akaTitlesWithRegion,
  GROUP_CONCAT(DISTINCT CONCAT(IFNULL(tp.nconst, 'N/A'), ':', IFNULL(p.primaryName, 'N/A'), ':', IFNULL(tp.category, 'N/A')) SEPARATOR ',') AS castAndCrew,
  COALESCE(tr.averageRating, 0) AS avRating,
  COALESCE(tr.numVotes, 0) AS nVotes
  FROM TitleBasics tb
  JOIN TitleAkas ta ON tb.tconst = ta.titleId
  JOIN TitlePrincipal tp ON tb.tconst = tp.tconst
  JOIN Person p ON tp.nconst = p.nconst
  LEFT JOIN TitleRating tr ON tb.tconst = tr.tconst
  WHERE 
      tb.genres LIKE CONCAT('%', :qgenre, '%')
      AND tr.averageRating >= :minrating
      AND (:yrFrom IS NULL OR tb.startYear >= :yrFrom)
      AND (:yrTo IS NULL OR tb.startYear <= :yrTo)
  GROUP BY tb.tconst;

  `;
try {
  const result = await executeQuery(query, [qgenre, minrating, yrFrom, yrTo]);
  console.log('Fetched data:', result);
  return result.length > 0 ? result : null;

} catch (error) {
  console.error('Error fetching data:', error);
  throw error; // Rethrow the error
}

};

// d. [GET] /name/:nameID
const getNameDetails = async (nameID) => {
    const query = `
    SELECT
    p.nconst AS nameID,
    p.primaryName AS name,
    p.img_url AS namePoster,
    p.birthYear,
    p.deathYear,
    p.primaryProfession AS profession,
    (GROUP_CONCAT(DISTINCT CONCAT (IFNULL (tp.tconst, 'N/A'), ':', IFNULL (tp.category, 'N/A')) SEPARATOR = ',') AS nameTitles
    FROM Person p
    LEFT JOIN TitlePrincipal tp ON p.nconst = tp.nconst
    WHERE p.nconst = ?
   `;
 
    try {
        const result = await executeQuery(query, [nameID]);
        console.log('Fetched data:', result);
        return result.length > 0 ? result[0] : null;

        } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error
    }
};

// e. [GET] /searchname
const searchName = async (namePart) => {
    const query = `
      SELECT
        p.nconst AS nameID,
        p.primaryName AS name,
        p.image_url AS namePoster,
        p.birthYear,
        p.deathYear,
        p.primaryProfession AS profession,
        GROUP_CONCAT(DISTINCT CONCAT(IFNULL(tp.tconst, 'N/A'), ':', IFNULL(tp.category, 'N/A')) SEPARATOR ',') AS nameTitles
      FROM Person p
      LEFT JOIN TitlePrincipal tp ON p.nconst = tp.nconst
      WHERE p.primaryName LIKE ?
      GROUP BY p.nconst;
    `;
    try {
      const result = await executeQuery(query, [`${namePart}%`]); 
      console.log('Fetched data:', result);
      return result.length > 0 ? result : null;

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error
    }
  };
  
  

