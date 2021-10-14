import {createRef, Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// Item props: name, id, disabled
export default function SelectMenu({label, items, selectedItem, onSelectedChange , className= ""}) {
    const [listMinWidth, setListMinWidth] = useState(0);
    const wrapperRef = createRef();

    useEffect(() => {
        setListMinWidth(wrapperRef.current.offsetWidth);
    }, []);

    return (
        <div className={className} ref={wrapperRef}>
            <Listbox value={selectedItem} onChange={onSelectedChange}>
                <Listbox.Label className="block text-sm font-medium text-white">{label}</Listbox.Label>
                <div className="mt-1">
                    <Listbox.Button
                        style={{minHeight: "38px"}}
                        className="inline-block relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span className="flex items-center">
            <span className="ml-3 block truncate">{selectedItem.name}</span>
          </span>
                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
          </span>
                    </Listbox.Button>

                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                        <Listbox.Options
                            style={{minWidth: listMinWidth}}
                            className="fixed z-100 mt-1 bg-dark-7 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {items.map((item) => (
                                <Listbox.Option
                                    disabled={item.disabled}
                                    key={item.id}
                                    className={({active}) =>
                                        classNames(
                                            active ? 'text-white bg-indigo-600' : 'text-gray-300',
                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                        )
                                    }
                                    value={item}
                                >
                                    {({selected, active}) => {
                                        // fix
                                        selected = item.id === selectedItem.id;

                                        return (
                                            <>
                                                <div className="flex items-center">
                                            <span
                                                className={classNames(item.disabled ? 'opacity-50' : '', classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate'))}>
                        {item.name}
                      </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-gray-300',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>
                                                ) : null}
                                            </>
                                        )
                                    }}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}