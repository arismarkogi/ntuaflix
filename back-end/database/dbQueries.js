const { executeQuery } = require('./db.js');



// a. [GET] /title/:titleID
const getTitleDetails = async (titleID) => {
  const query = `
  SELECT 
  tb.tconst AS titleID,
  tb.titleType AS type,
  tb.originalTitle,
  tb.img_url_asset AS titlePoster,
  tb.startYear,
  tb.endYear AS endYear,
  tb.genres,
  GROUP_CONCAT(DISTINCT CONCAT(IFNULL(ta.title, 'N/A'), '/*/', IFNULL(ta.region, 'N/A')) SEPARATOR '/**/') AS akaTitlesWithRegion,
  GROUP_CONCAT(DISTINCT CONCAT(IFNULL(tp.nconst, 'N/A'), '/*/', IFNULL(p.primaryName, 'N/A'), '/*/', IFNULL(tp.category, 'N/A')) SEPARATOR '/**/') AS castAndCrew,
  tr.averageRating AS avRating,
  tr.numVotes AS nVotes
  FROM TitleBasics tb
  JOIN TitleAkas ta ON tb.tconst = ta.titleId
  JOIN TitlePrincipal tp ON tb.tconst = tp.tconst
  JOIN Person p ON tp.nconst = p.nconst
  LEFT JOIN TitleRating tr ON tb.tconst = tr.tconst  
  WHERE tb.tconst = ?
  `;

  try {
    const result = await executeQuery(query, titleID);
    return result[0];

  } catch (error) {
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
  GROUP_CONCAT(DISTINCT CONCAT(IFNULL(ta.title, 'N/A'), '/*/', IFNULL(ta.region, 'N/A')) SEPARATOR '/**/') AS akaTitlesWithRegion,
  GROUP_CONCAT(DISTINCT CONCAT(IFNULL(tp.nconst, 'N/A'), '/*/', IFNULL(p.primaryName, 'N/A'), '/*/', IFNULL(tp.category, 'N/A')) SEPARATOR '/**/') AS castAndCrew,
  tr.averageRating AS avRating,
  tr.numVotes AS nVotes
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
  return result;

} catch (error) {
  console.error('Error fetching data:', error);
  throw error; // Rethrow the error
}

};

// c. [GET] /bygenre
const searchByGenre = async (qgenre, minrating, yrFrom, yrTo) => {
  let query = `
    SELECT 
      tb.tconst AS titleID,
      tb.titleType AS type,
      tb.originalTitle,
      tb.img_url_asset AS titlePoster,
      tb.startYear,
      tb.endYear,
      tb.genres,
      GROUP_CONCAT(DISTINCT CONCAT(IFNULL(ta.title, 'N/A'), '/*/', IFNULL(ta.region, 'N/A')) SEPARATOR '/**/') AS akaTitlesWithRegion,
      GROUP_CONCAT(DISTINCT CONCAT(IFNULL(tp.nconst, 'N/A'), '/*/', IFNULL(p.primaryName, 'N/A'), '/*/', IFNULL(tp.category, 'N/A')) SEPARATOR '/**/') AS castAndCrew,
      tr.averageRating AS avRating,
      tr.numVotes AS nVotes
    FROM TitleBasics tb
      JOIN TitleAkas ta ON tb.tconst = ta.titleId
      JOIN TitlePrincipal tp ON tb.tconst = tp.tconst
      JOIN Person p ON tp.nconst = p.nconst
      LEFT JOIN TitleRating tr ON tb.tconst = tr.tconst
    WHERE  
      tb.genres LIKE CONCAT('%', ?, '%') AND 
      tr.averageRating >= ?`;

  if (yrFrom !== null && !isNaN(yrFrom)) {
    query += ' AND tb.startYear >= ?';
  }

  if (yrTo !== null && !isNaN(yrTo)) {
    query += ' AND tb.startYear <= ?';
  }

  query += ' GROUP BY tb.tconst;';

  try {

    // Determine the parameters to pass based on null checks
    const params = [qgenre, minrating];
    if (yrFrom !== null && !isNaN(yrFrom)) {
      params.push(yrFrom);
    }
    if (yrTo !== null && !isNaN(yrTo)) {
      params.push(yrTo);
    }

    const result = await executeQuery(query, params);
    console.log('Fetched data:', result);
    return result;
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
    p.img_url_asset AS namePoster,
    p.birthYear AS birthYr,
    p.deathYear AS deathYr,
    p.primaryProfession AS profession,
    (
        SELECT GROUP_CONCAT(DISTINCT CONCAT(IFNULL(tp.tconst, 'N/A'), '/*/', IFNULL(tp.category, 'N/A')) SEPARATOR '/**/')
        FROM TitlePrincipal tp
        WHERE p.nconst = tp.nconst
    ) AS nameTitles
    FROM Person p
    WHERE p.nconst = ?;
   `;
 
    try {
        const result = await executeQuery(query, [nameID]);
        return result[0];

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
        p.img_url_asset AS namePoster,
        p.birthYear AS birthYr,
        p.deathYear AS deathYr,
        p.primaryProfession AS profession,
        GROUP_CONCAT(DISTINCT CONCAT(IFNULL(tp.tconst, 'N/A'), '/*/', IFNULL(tp.category, 'N/A')) SEPARATOR '/**/') AS nameTitles
      FROM Person p
      LEFT JOIN TitlePrincipal tp ON p.nconst = tp.nconst
      WHERE p.primaryName LIKE ?
      GROUP BY p.nconst;
    `;
    try {
      const result = await executeQuery(query, [`${namePart}%`]); 
      return result;

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error
    }
  };

  module.exports = {getTitleDetails, getNameDetails, searchName, searchByGenre, searchTitle };

  
  
