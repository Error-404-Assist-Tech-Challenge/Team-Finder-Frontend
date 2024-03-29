/* eslint-disable react/prop-types */
import { useState } from 'react';
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core';
import SkillLevel from './SkillLevel';

export function SkillSelect({ skills, value, setValue }) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });
    const [search, setSearch] = useState('');

    const handleValueSelect = (skill) =>
        setValue((current) =>
            current.some((s) => s.id === skill.id)
                ? current.filter((s) => s.id !== skill.id)
                : [...current, skill]
        );

    const handleValueRemove = (skill) =>
        setValue((current) => current.filter((s) => s.id !== skill.id));

    const values = value.map((skill) => (
        <Pill key={skill.id} withRemoveButton onRemove={() => handleValueRemove(skill)} className="h-auto">
            <div className="h-[50px] pb-[2px] w-[130px] flex justify-center flex-wrap">
                <p className="">{skill.name}</p>
                <SkillLevel skills={value} setSkills={setValue} skill_id={skill.id} />
            </div>
        </Pill>
    ));

    const options = skills
        .filter((skill) => skill.name.toLowerCase().includes(search.trim().toLowerCase()))
        .map((skill) => (
            <Combobox.Option value={skill} key={skill.id} active={value.some((s) => s.id === skill.id)}>
                <Group gap="sm" className="text-[#000000]">
                    {value.some((s) => s.id === skill.id) ? <CheckIcon size={12} /> : null}
                    <span>{skill.name}</span>
                </Group>
            </Combobox.Option>
        ));

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false} label="Skill Requirements" className="py-[5px]">
            <Combobox.DropdownTarget>
                <PillsInput onClick={() => combobox.openDropdown()}>
                    <Pill.Group>
                        {values}
                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                onFocus={() => combobox.openDropdown()}
                                onBlur={() => combobox.closeDropdown()}
                                placeholder="Skill Requirement..."
                                value={search}
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
                    {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}