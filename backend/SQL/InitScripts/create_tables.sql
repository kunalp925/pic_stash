CREATE LOGIN ApplicationUser WITH PASSWORD = 'Change_This_1';
GO


CREATE DATABASE PicStash;
GO

USE PicStash;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'ApplicationUser')
BEGIN
    CREATE USER [ApplicationUser] FOR LOGIN [ApplicationUser]
    EXEC sp_addrolemember N'db_owner', N'ApplicationUser'
END;
GO

CREATE TABLE Users (
  ID INTEGER NOT NULL,
  Username VARCHAR(100),
  PasswordHash VARCHAR(255),
  CreatedAt TIMESTAMP,
  PRIMARY KEY (ID)
);
GO

CREATE TABLE Posts (
  ID INTEGER,
  Title VARCHAR, 
  PathLocation TEXT,
  UserId INTEGER,
  Visible BIT,
  CreatedAt TIMESTAMP,
  PRIMARY KEY (ID),
  FOREIGN KEY (UserId) REFERENCES Users(ID)
);
GO

CREATE TABLE Metadata (
    ID INTEGER,
    PostId INTEGER,
    CameraType VARCHAR,
    PicLocation TEXT,
    PRIMARY KEY (ID),
    FOREIGN KEY (PostId) REFERENCES Posts(ID)
);
GO

CREATE TABLE Tags (
    ID INTEGER,
    PostId INTEGER,
    Tag TEXT,
    PRIMARY KEY (ID),
    FOREIGN KEY (PostId) REFERENCES Posts(ID)
);
GO