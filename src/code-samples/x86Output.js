export default `int *ints = (int*) bytes;
for (int i = 0; i < 4; i++) {
  printf("%08x", ints[i]);
}
printf("\\n");`;
