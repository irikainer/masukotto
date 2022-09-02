-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema masukotto
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema masukotto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `masukotto` DEFAULT CHARACTER SET utf8mb4 ;
USE `masukotto` ;

-- -----------------------------------------------------
-- Table `masukotto`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masukotto`.`usuarios` (
  `idUsuario` INT(11) NOT NULL,
  `idTipoUsuario` INT(11) NOT NULL,
  `NombreUsuario` VARCHAR(50) NOT NULL,
  `ApellidoUsuario` VARCHAR(60) NOT NULL,
  `MailUsuario` VARCHAR(60) NOT NULL,
  `PassUsuario` VARCHAR(64) NOT NULL,
  `TelefonoUsuario` VARCHAR(15) NULL DEFAULT NULL,
  `ProvinciaUsuario` VARCHAR(45) NULL DEFAULT NULL,
  `LocalidadUsuario` VARCHAR(45) NULL DEFAULT NULL,
  `CPUsuario` INT(11) NULL DEFAULT NULL,
  `DomCalleUsuario` VARCHAR(45) NULL DEFAULT NULL,
  `DomNumUsuario` VARCHAR(45) NULL DEFAULT NULL,
  `DomPisoDptoUsuario` VARCHAR(45) NULL DEFAULT NULL,
  `EstadoUsuario` VARCHAR(45) NULL DEFAULT NULL,
  `PuntajeUsuario` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `masukotto`.`guarderias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masukotto`.`guarderias` (
  `idGuarderia` INT(11) NOT NULL,
  `idUsuario` INT(11) NOT NULL,
  `NombreGuarderia` VARCHAR(45) NOT NULL,
  `TelGuarderia` VARCHAR(15) NOT NULL,
  `ProvinciaGuarderia` VARCHAR(45) NOT NULL,
  `LocalidadGuarderia` VARCHAR(45) NOT NULL,
  `CPGuarderia` VARCHAR(45) NOT NULL,
  `DomCalleGuarderia` VARCHAR(45) NOT NULL,
  `DomNumeroGuarderia` VARCHAR(45) NOT NULL,
  `DomPisoDptoGuarderia` VARCHAR(45) NOT NULL,
  `TipoGuarderia` VARCHAR(45) NOT NULL,
  `MailGuarderia` VARCHAR(45) NOT NULL,
  `DescripcionGuarderia` VARCHAR(2000) NULL DEFAULT NULL,
  `CalificacionGuarderia` INT(11) NULL DEFAULT NULL,
  `MascEspecieGuarderia` VARCHAR(45) NOT NULL,
  `LugaresGuarderia` INT(11) NOT NULL,
  `MascTalleGuarderia` VARCHAR(45) NOT NULL,
  `EstadoGuarderia` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idGuarderia`),
  INDEX `fk_guarderias_usuarios1` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_guarderias_usuarios1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `masukotto`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `masukotto`.`mascotas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masukotto`.`mascotas` (
  `idMascota` INT(11) NOT NULL,
  `idUsuario` INT(11) NOT NULL,
  `NombreMascota` VARCHAR(45) NOT NULL,
  `EspecieMascota` VARCHAR(45) NOT NULL,
  `RazaMascota` VARCHAR(45) NOT NULL,
  `AnioNacimientoMascota` INT(11) NOT NULL,
  `AlimentoMascota` VARCHAR(45) NULL DEFAULT NULL,
  `EnfermedadesMascota` VARCHAR(1000) NULL DEFAULT NULL,
  `VetNombreMascota` VARCHAR(200) NULL DEFAULT NULL,
  `VetTelMascota` VARCHAR(15) NULL DEFAULT NULL,
  `EstadoMascota` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idMascota`),
  INDEX `fk_mascotas_usuarios1` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_mascotas_usuarios1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `masukotto`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `masukotto`.`fotos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masukotto`.`fotos` (
  `idFoto` INT(11) NOT NULL,
  `RutaFoto` VARCHAR(200) NOT NULL,
  `idUsuario` INT(11) NOT NULL,
  `idMascota` INT(11) NULL DEFAULT NULL,
  `idGuarderia` INT(11) NULL DEFAULT NULL,
  `EstadoFoto` TINYINT(1) NULL DEFAULT NULL,
  `DescripcionFoto` VARCHAR(200) NULL DEFAULT NULL,
  `PrincipalFoto` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`idFoto`),
  INDEX `fk_fotos_usuarios` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_fotos_guarderias1` (`idGuarderia` ASC) VISIBLE,
  INDEX `fk_fotos_mascotas1` (`idMascota` ASC) VISIBLE,
  CONSTRAINT `fk_fotos_guarderias1`
    FOREIGN KEY (`idGuarderia`)
    REFERENCES `masukotto`.`guarderias` (`idGuarderia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fotos_mascotas1`
    FOREIGN KEY (`idMascota`)
    REFERENCES `masukotto`.`mascotas` (`idMascota`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fotos_usuarios`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `masukotto`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `masukotto`.`reservas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masukotto`.`reservas` (
  `idReserva` INT(11) NOT NULL,
  `idUsuarioMascoter` INT(11) NOT NULL,
  `idUsuarioGuarderia` INT(11) NOT NULL,
  `idMascota` INT(11) NOT NULL,
  `idGuarderia` INT(11) NOT NULL,
  `FechaDesdeReserva` DATETIME NOT NULL,
  `FechaHastaReserva` DATETIME NOT NULL,
  `ConfirmaReserva` TINYINT(1) NOT NULL,
  `EstadoReserva` VARCHAR(45) NOT NULL,
  `CalificacionReserva` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idReserva`),
  INDEX `fk_reservas_usuarios1` (`idUsuarioMascoter` ASC) VISIBLE,
  INDEX `fk_reservas_guarderias1` (`idGuarderia` ASC) VISIBLE,
  INDEX `fk_reservas_mascotas1` (`idMascota` ASC) VISIBLE,
  CONSTRAINT `fk_reservas_guarderias1`
    FOREIGN KEY (`idGuarderia`)
    REFERENCES `masukotto`.`guarderias` (`idGuarderia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_mascotas1`
    FOREIGN KEY (`idMascota`)
    REFERENCES `masukotto`.`mascotas` (`idMascota`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_usuarios1`
    FOREIGN KEY (`idUsuarioMascoter`)
    REFERENCES `masukotto`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
