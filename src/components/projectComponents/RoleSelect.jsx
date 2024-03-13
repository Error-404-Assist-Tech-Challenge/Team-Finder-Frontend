/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { PillsInput, Pill, Combobox, CheckIcon, Group, useCombobox, Button } from '@mantine/core';

export default function ExistingRoleSelect({ roles, teamRoles, setTeamRoles, projectRoles, setProjectRoles }) {

    const [search, setSearch] = useState('');
    const [value, setValue] = useState([]);
    // console.log(value)
    // console.log('projectRoles', projectRoles)

    const updateUserRoles = () => {
        const updatedProjectRoles = value.map(item => ({
            role_id: item,
            count: teamRoles.find(role => role.role_id === item).count,
        }));

        setProjectRoles(updatedProjectRoles)
    }

    useEffect(() => {
        updateUserRoles();
    }, [value, teamRoles])

    const addCount = (role_id) => {
        setTeamRoles(prevRoles => (
            prevRoles.map(role =>
                role.role_id === role_id ? { ...role, count: parseInt(role.count, 10) + 1 } : role
            )
        ));
    }

    const removeCount = (role_id) => {
        const my_role = teamRoles.find(role => role.role_id === role_id);
        if (my_role.count == 1) {
            handleValueRemove(role_id)
        }
        else {
            setTeamRoles(prevRoles => (
                prevRoles.map(role =>
                    role.role_id === role_id && role.count > 0 ? { ...role, count: parseInt(role.count, 10) - 1 } : role
                )
            ));
        }
    }

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    useEffect(() => {
        const mappedProjectRoles = projectRoles.map(role => role.role_id); // only difference
        teamRoles.map(teamRole => {
            const correspondingRole = projectRoles.find(role => role.role_id === teamRole.role_id);
            if (correspondingRole) {
                teamRole.count = correspondingRole.count;
            }
            return teamRole;
        });
        setValue(mappedProjectRoles);
    }, [])

    const handleValueSelect = (val) => {
        setValue((current) =>
            current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
        );
    }

    const handleValueRemove = (val) => {
        setValue((current) => current.filter((v) => v !== val));
    }

    const values = value.map((item) => {
        const role = roles.find(role => role.value === item);
        const newRole = teamRoles.find(role => role.role_id === item);

        return (
            <Pill key={item} size="lg">
                <div className="flex items-center">
                    <Button variant="outline" onClick={() => removeCount(item)}
                        className={`w-[15px] h-[15px] m-[6px] rounded-full p-0 text-accent border-accent border-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus w-[12px] h-[12px]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </Button>

                    {newRole.count}x {role.label}

                    <Button variant="outline" onClick={() => addCount(item)}
                        className={`w-[15px] h-[15px] m-[6px] rounded-full p-0 text-accent border-accent border-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-[15px] h-[15px]" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </Button>
                </div>
            </Pill>
        );
    });

    const options = roles
        .filter((item) => item.label.toLowerCase().includes(search.trim().toLowerCase()))
        .map((item) => (
            <Combobox.Option
                value={item.value}
                key={item.value}
                active={value.some((val) => val === item.value)}
            >
                <Group gap="sm">
                    {value.some((val) => val === item.value) ? <CheckIcon size={12} /> : null}
                    <span>{item.label}</span>
                </Group>
            </Combobox.Option>
        ));

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} label="Team Roles" className="">
            <Combobox.DropdownTarget>
                <PillsInput onClick={() => combobox.openDropdown()}>
                    <Pill.Group>
                        {values}
                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                onFocus={() => combobox.openDropdown()}
                                onBlur={() => combobox.closeDropdown()}
                                value={search}
                                placeholder="Role..."
                                onChange={(event) => {
                                    combobox.updateSelectedOptionIndex();
                                    setSearch(event.currentTarget.value);
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Backspace' && search.length === 0) {
                                        event.preventDefault();
                                        handleValueRemove(value[value.length - 1]);
                                    }
                                }}
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>
            <Combobox.Dropdown>
                <Combobox.Options>
                    {options.length > 0 ? options : <Combobox.Empty>Role does not exist...</Combobox.Empty>}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
