const { getTitleDetails, searchTitle, searchByGenre, searchName, getNameDetails } = require('./dbQueries.js');

class titleObject {
  constructor(
    titleID = '',
    type = '',
    originalTitle = '',
    titlePoster = '',
    startYear = '',
    endYear = '',
    genres = '',
    titleAkas = '',
    principals = '',
    avRating = 0,
    nVotes = 0
  ) {
    this.titleID = titleID;
    this.type = type;
    this.originalTitle = originalTitle;
    this.titlePoster = titlePoster;
    this.startYear = startYear;
    this.endYear = endYear;
    this.genres = genres ? genres.split(',').map((genreTitle) => new Genre(genreTitle.trim())) : [];
    this.titleAkas = titleAkas ? titleAkas.split('/**/').map((aka) => {
      const [akaTitle, regionAbbrev] = aka.split('/*/').map(value => value.trim() === 'N/A' ? null : value.trim());
      return new TitleAka(akaTitle, regionAbbrev);
  }) : [];
  
  this.principals = principals ? principals.split('/**/').map((principal) => {
      const [nameID, name, category] = principal.split('/*/').map(value => value.trim() === 'N/A' ? null : value.trim());
      return new TitlePrincipal(nameID, name, category);
  }) : [];
  
    this.rating = new Rating(avRating, nVotes);
  }
  

   async getByTitleID(titleID) {
    try {
      const titleDetails = await getTitleDetails(titleID);

      if(!titleDetails){
        return null;
      }
      return new titleObject(
        titleDetails.titleID,
        titleDetails.type,
        titleDetails.originalTitle,
        titleDetails.titlePoster,
        titleDetails.startYear,
        titleDetails.endYear,
        titleDetails.genres,
        titleDetails.akaTitlesWithRegion,
        titleDetails.castAndCrew,
        titleDetails.avRating,
        titleDetails.nVotes
      );
    } catch (error) {
      console.error('Error fetching title details:', error);
      throw error;
    }
  }

  async getByTitlePart(tQueryObject){
    
    // Remeber to to the gquery in the API call  
    try{
      const titleListData = await searchTitle(tQueryObject.titlePart);

      if(!titleListData){
        return null;
      }
      // Map the title data to create an array of titleObject instances
      const titleList = titleListData.map(titleData => new titleObject(
      titleData.titleID,
      titleData.type,
      titleData.originalTitle,
      titleData.titlePoster,
      titleData.startYear,
      titleData.endYear,
      titleData.genres,
      titleData.akaTitlesWithRegion,
      titleData.castAndCrew,
      titleData.avRating,
      titleData.nVotes
    ));
      
      return titleList;

    } catch(error){
      console.error('Error fetching titleList:', error);
      throw error;
    }
  }

  async getByGenre(gqueryObject){

    try{
      const byGenreListData = await searchByGenre(gqueryObject.qgenre, gqueryObject.minrating, gqueryObject.yrFrom, gqueryObject.yrTo);
      
      if(!byGenreListData){
        return null;
      }
      // Map the title data to create an array of titleObject instances
      const byGenreList = byGenreListData.map(byGenreData => new titleObject(
      byGenreData.titleID,
      byGenreData.type,
      byGenreData.originalTitle,
      byGenreData.titlePoster,
      byGenreData.startYear,
      byGenreData.endYear,
      byGenreData.genres,
      byGenreData.akaTitlesWithRegion,
      byGenreData.castAndCrew,
      byGenreData.avRating,
      byGenreData.nVotes
    ));
      
      return byGenreList;

    } catch(error){
      console.error('Error fetching byGenreList:', error);
      throw error;
    }

  }
}

  class Genre {
    constructor(genreTitle) {
      this.genreTitle = genreTitle;
    }
  }
  
  class TitleAka {
    constructor(akaTitle, regionAbbrev) {
      this.akaTitle = akaTitle;
      this.regionAbbrev = regionAbbrev;
    }
  }
  
  class TitlePrincipal {
    constructor(nameID, name, category) {
      this.nameID = nameID;
      this.name = name;
      this.category = category;
    }
  }
  
  class Rating {
    constructor(avRating, nVotes) {
      this.avRating = avRating;
      this.nVotes = nVotes;
    }
  }

  class tqueryObject {
    constructor(titlePart) {
      this.titlePart = titlePart;
    }
  }

  class gqueryObject {
    constructor(qgenre, minrating, yrFrom, yrTo) {
      this.qgenre = qgenre;
      this.minrating = minrating;
      this.yrFrom = yrFrom;
      this.yrTo = yrTo;
    }
  }

  class nameObject {
    constructor(nameID, name, namePoster, birthYr, deathYr, profession, nameTitles) {
      this.nameID = nameID;
      this.name = name;
      this.namePoster = namePoster;
      this.birthYr = birthYr;
      this.deathYr = deathYr;
      this.profession = profession;
      this.nameTitles = nameTitles ? nameTitles.split('/**/').map((title) => {
        const [titleID, category] = title.split('/*/').map(value => value.trim() === 'N/A' ? null : value.trim());
        return new NameTitle(titleID, category);
    }) : [];
    
    }

    async getByNameID(nameID){

      try {
        const nameDetails = await getNameDetails(nameID);
        if(!nameDetails){
          return null;
        }
        return new nameObject(
          nameDetails.nameID,
          nameDetails.name,
          nameDetails.namePoster,
          nameDetails.birthYr,
          nameDetails.deathYr,
          nameDetails.profession,
          nameDetails.nameTitles
        );
      } catch (error) {
        console.error('Error fetching name details:', error);
        throw error;
      }

    }

    async getByNamePart(nQueryobject){

      try {
        const byNamePartListData = await searchName(nQueryobject.namePart);
        
        if(!byNamePartListData){
          return null;
        }
        const byNamePartList = byNamePartListData.map( nameDetails => new nameObject(
          nameDetails.nameID,
          nameDetails.name,
          nameDetails.namePoster,
          nameDetails.birthYr,
          nameDetails.deathYr,
          nameDetails.profession,
          nameDetails.nameTitles
        ));
        console.log(byNamePartList);
        return byNamePartList;
      } catch (error) {
        console.error('Error fetching byNamePartList details:', error);
        throw error;
      }

    }


  }
  
  class NameTitle {
    constructor(titleID, category) {
      this.titleID = titleID;
      this.category = category;
    }
  }

  class nqueryObject {
    constructor(namePart) {
      this.namePart = namePart;
    }
  }

  module.exports = {titleObject, tqueryObject, gqueryObject, nameObject, nqueryObject}