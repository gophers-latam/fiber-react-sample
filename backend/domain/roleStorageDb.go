package domain

import (
	"backend/errs"
	"backend/logs"
	"errors"

	"gorm.io/gorm"
)

type RoleStorageDb struct {
	client *gorm.DB
}

func NewRoleStorageDb(dbClient *gorm.DB) RoleStorageDb {
	return RoleStorageDb{dbClient}
}

func (db RoleStorageDb) InsertRole(role Role) (*Role, *errs.AppError) {
	r := db.client.Create(&role)
	if r.Error != nil {
		logs.Error("Error creating role: " + r.Error.Error())
		return &role, errs.NewUnexpectedError("Unexpected error from database")
	}

	return &role, nil
}

func (db RoleStorageDb) SelectRole(role Role) (*Role, *errs.AppError) {
	var rol Role
	r := db.client.Where("id = ?", role.ID).Preload("Permissions").First(&rol)
	if r.Error != nil {
		if errors.Is(r.Error, gorm.ErrRecordNotFound) {
			return &rol, errs.NewUnexpectedError("Role not found")
		}
		logs.Error("Error finding role: " + r.Error.Error())
		return &rol, errs.NewUnexpectedError("Unexpected error from database")
	}

	return &rol, nil
}

func (db RoleStorageDb) SelectRoles() (*[]Role, *errs.AppError) {
	roles := make([]Role, 0)
	r := db.client.Preload("Permissions").Find(&roles)
	if r.Error != nil {
		if errors.Is(r.Error, gorm.ErrEmptySlice) {
			return &roles, errs.NewUnexpectedError("Roles not found")
		}
		logs.Error("Error finding roles: " + r.Error.Error())
		return &roles, errs.NewUnexpectedError("Unexpected error from database")
	}

	return &roles, nil
}

func (db RoleStorageDb) UpdateRole(role Role) (*Role, *errs.AppError) {
	var r interface{}
	r1 := db.client.Table("role_permissions").Where("role_id", role.ID).Delete(&r)
	if r1.Error != nil {
		logs.Error("Error updating role: " + r1.Error.Error())
		return &role, errs.NewUnexpectedError("Unexpected error from database")
	}

	r2 := db.client.Model(&role).Updates(role)
	if r2.Error != nil {
		logs.Error("Error updating role: " + r2.Error.Error())
		return &role, errs.NewUnexpectedError("Unexpected error from database")
	}

	return &role, nil
}

func (db RoleStorageDb) DeleteRole(role Role) *errs.AppError {
	r := db.client.Delete(&role)
	if r.Error != nil {
		logs.Error("Error deleting role: " + r.Error.Error())
		return errs.NewUnexpectedError("Unexpected error from database")
	}

	return nil
}
