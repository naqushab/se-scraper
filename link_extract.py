import json
import os
import glob
import codecs

json_glob = os.path.join(os.getcwd(), 'results', '*.json')

def iterate_all(iterable):  
    if isinstance(iterable, dict):
        for key, value in iterable.items():
            if key == "link":
                if not (isinstance(value, dict) or isinstance(value, list)):
                    yield value
            for ret in iterate_all(value):
                yield ret
    elif isinstance(iterable, list):
        for el in iterable:
            for ret in iterate_all(el):
                yield ret

def write_to_file(url_list, file_path):
    with codecs.open(file_path, 'w', 'utf-8', 'surrogateescape') as ff:
        for item in url_list:
            ff.write("%s\n" % item)

def main():
    for file_path in glob.glob(json_glob):
        with codecs.open(file_path, 'r', 'utf-8', 'ignore') as fj:
            data = json.load(fj)
            url_list = list(iterate_all(data))
        links_file = os.path.join(os.path.splitext(file_path)[0] + '.txt' )
        write_to_file(url_list, links_file)

if __name__ == "__main__":
    main()